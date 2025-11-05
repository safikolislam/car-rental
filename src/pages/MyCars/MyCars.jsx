import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => (
  <div className="min-h-screen flex justify-center items-center bg-white">
    <ClipLoader color="#3B82F6" size={50} />
  </div>
);

const MyCars = () => {
  const { user, loading } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [editingCar, setEditingCar] = useState(null);
  const [search, setSearch] = useState("");
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
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-cars?email=${user.email}`
      );
      return res.data;
    },
  });


  const deleteCarMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/cars/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Car deleted successfully!");
      queryClient.invalidateQueries(["myCars", user?.email]);
    },
    onError: () => toast.error("Failed to delete car!"),
  });


  const updateCarMutation = useMutation({
    mutationFn: async (carData) => {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/cars/${carData._id}`,
        carData
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Car updated successfully!");
      setEditingCar(null);
      queryClient.invalidateQueries(["myCars", user?.email]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to update car!");
    },
  });


  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!editingCar) return;

    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());

    const updatedCar = {
      ...editingCar,
      ...updatedData,
      price: Number(updatedData.price),
      features: updatedData.features || "",
    };

    updateCarMutation.mutate(updatedCar);
  };

  if (isLoading || loading) return <Loading />;
  if (isError) toast.error(error.message || "Something went wrong!");

 
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


  const filteredCars = cars.filter((car) =>
    car.model.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="p-6 bg-base-100 min-h-screen mx-auto max-w-7xl">
      <h2 className="text-3xl font-extrabold mb-4 text-base-content border-b pb-2">
        Your Listed Cars
      </h2>

    
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by car model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-sm"
        />
      </div>

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
            {filteredCars.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No cars found matching "{search}".
                </td>
              </tr>
            )}
            {filteredCars.map((car) => (
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
                        : car.availability === "Rented"
                        ? "badge-warning"
                        : "badge-error"
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

           
              <input
                type="text"
                name="features"
                defaultValue={
                  typeof editingCar.features === "string"
                    ? editingCar.features
                    : ""
                }
                placeholder="Features (Comma separated)"
                className="input input-bordered w-full"
              />

           
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/70">
                    Availability
                  </span>
                </label>
                <select
                  name="availability"
                  defaultValue={editingCar.availability || "Available"}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Rented">Rented</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

            
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
                  {updateCarMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default MyCars;





















