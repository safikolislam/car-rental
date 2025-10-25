import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";


const Loading = () => (
  <div className="p-8 text-center text-lg text-info">Loading...</div>
);

const MyCars = () => {
  const { user, loading } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [editingCar, setEditingCar] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (editingCar) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [editingCar]);


  const {
    data: cars = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myCars", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/my-cars?email=${user.email}`
      );
      if (!res.ok) throw new Error("Failed to fetch cars");
      return res.json();
    },
  });


  const deleteCarMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cars/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete car");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Car deleted successfully!");
      queryClient.invalidateQueries(["myCars", user?.email]);
    },
    onError: () => toast.error("Failed to delete car!"),
  });


  const updateCarMutation = useMutation({
    mutationFn: async (carData) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/${carData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
      });
      if (!res.ok) throw new Error("Failed to update car");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Car updated successfully!");
      setEditingCar(null);
      queryClient.invalidateQueries(["myCars", user?.email]);
    },
    onError: () => toast.error("Failed to update car!"),
  });

  if (isError) toast.error(error.message || "Something went wrong!");

  if (loading || isLoading) return <Loading />;

  if (cars.length === 0)
    return (
      <div className="text-center py-12 text-lg text-base-content">
        You haven't added any cars yet.{" "}
        <a
          href="/add-car"
          className="text-primary underline hover:text-primary-focus transition-colors"
        >
          Add a Car Now
        </a>
      </div>
    );

  const handleDelete = (car) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${car.model}. This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn btn-error mr-2",
        cancelButton: "btn btn-ghost",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) deleteCarMutation.mutate(car._id);
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!editingCar) return;

    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());


    const featuresArray = updatedData.features
      ? updatedData.features
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f.length > 0)
      : [];

    const updatedCar = {
      ...editingCar,
      ...updatedData,
      price: Number(updatedData.price),
      features: featuresArray,
    };

    updateCarMutation.mutate(updatedCar);
  };

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-base-content border-b pb-2">
        Your Listed Cars
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-lg border border-base-300">
        <table className="table w-full table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>Image</th>
              <th>Model</th>
              <th>Price ($)</th>
              <th>Bookings</th>
              <th>Status</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id} className="text-base-content/80">
                <td>
                  <img
                    src={
                      car.imageUrl ||
                      "https://placehold.co/96x64/888888/ffffff?text=No+Image"
                    }
                    alt={car.model}
                    className="w-24 h-16 object-cover rounded-md shadow-sm"
                  />
                </td>
                <td className="font-semibold text-base-content">{car.model}</td>
                <td className="text-primary">${car.price}</td>
                <td>
                  <div className="badge badge-outline badge-info">
                    {car.bookingCount || 0}
                  </div>
                </td>
                <td>
                  <span
                    className={`badge ${
                      car.availability === "Available"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {car.availability || "Available"}
                  </span>
                </td>
                <td>{new Date(car.dateAdded).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-primary text-white"
                    onClick={() => setEditingCar(car)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleDelete(car)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
      <dialog
        ref={modalRef}
        className="modal backdrop-blur-sm"
        onClose={() => setEditingCar(null)}
      >
        {editingCar && (
          <div className="modal-box bg-base-100 shadow-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-base-content">
              Edit Car: {editingCar.model}
            </h3>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              {/* Image */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/70">
                    Current Image Preview
                  </span>
                </label>
                <img
                  src={editingCar.imageUrl}
                  alt="Car Preview"
                  className="w-full h-40 object-cover rounded-lg mb-2 border border-base-300"
                />
                <input
                  type="text"
                  name="imageUrl"
                  defaultValue={editingCar.imageUrl}
                  placeholder="Image URL"
                  className="input input-bordered w-full input-sm"
                  required
                />
              </div>

       
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="model"
                  defaultValue={editingCar.model}
                  placeholder="Car Model"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="number"
                  name="price"
                  defaultValue={editingCar.price}
                  placeholder="Price ($)"
                  className="input input-bordered w-full"
                  required
                />
              </div>

            
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="location"
                  defaultValue={editingCar.location || ""}
                  placeholder="Location"
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  name="registration"
                  defaultValue={editingCar.registration || ""}
                  placeholder="Registration Number"
                  className="input input-bordered w-full"
                />
              </div>

            
              <div className="form-control">
                <select
                  name="availability"
                  defaultValue={editingCar.availability || "Available"}
                  className="select select-bordered w-full"
                >
                  <option disabled>Select Availability</option>
                  <option value="Available">Available</option>
                  <option value="Rented">Rented</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

       
              <input
                type="text"
                name="features"
                defaultValue={
                  Array.isArray(editingCar.features)
                    ? editingCar.features.join(", ")
                    : editingCar.features || ""
                }
                placeholder="Features (Comma separated)"
                className="input input-bordered w-full"
              />

          
              <textarea
                name="description"
                defaultValue={editingCar.description || ""}
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                rows="3"
              />

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setEditingCar(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updateCarMutation.isPending}
                >
                  {updateCarMutation.isPending
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>

            <div
              className="modal-backdrop"
              onClick={() => setEditingCar(null)}
            ></div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default MyCars;


















