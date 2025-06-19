
import { useState, useEffect } from "react";
import { Link } from "react-router";

const API_BASE_URL = "https://rentify-server-sigma.vercel.app";

const MyCars = () => {
  const [cars, setCars] = useState([]);
  const [showModalCarId, setShowModalCarId] = useState(null);
  const [editingCar, setEditingCar] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const fetchCars = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/cars`);
      const data = await res.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleEditClick = (car) => {
    setEditingCar(car);
    setEditFormData({
      model: car.model,
      price: car.price,
      availability: car.availability,
      registrationNumber: car.registrationNumber,
      features: car.features,
      description: car.description,
      imageUrl: car.imageUrl,
      location: car.location,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!editingCar) return;

    try {
      const res = await fetch(`${API_BASE_URL}/cars/${editingCar._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (res.ok) {
        await fetchCars();
        setEditingCar(null);
      } else {
        console.error("Failed to update car");
      }
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleDelete = async (carId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/cars/${carId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchCars();
        setShowModalCarId(null);
      } else {
        console.error("Failed to delete car");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">My Cars</h2>

      {cars.length === 0 ? (
        <p className="font-semibold text-2xl text-center mt-40 min-h-screen">
          No cars added yet.
          <br />
          <Link to="/AddCar" className="text-blue-600 underline">
            Add a car
          </Link>
        </p>
      ) : (
        <>
     
          <div className="hidden sm:block overflow-x-auto">
            <table className="table table-zebra w-full min-w-[900px]">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Car Image</th>
                  <th>Car Model</th>
                  <th>Price/Day</th>
                  <th>Bookings</th>
                  <th>Availability</th>
                  <th>Date Added</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car, index) => (
                  <tr key={car._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={car.imageUrl}
                        alt={car.model}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td>{car.model}</td>
                    <td>${car.price}</td>
                    <td>{car.bookingCount || 0}</td>
                    <td>
                      <span
                        className={`badge ${
                          car.availability === "Available"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {car.availability}
                      </span>
                    </td>
                    <td>
                      {car.dateAdded
                        ? new Date(car.dateAdded).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-sm btn-outline btn-primary"
                          onClick={() => handleEditClick(car)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline btn-error"
                          onClick={() => setShowModalCarId(car._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        
          <div className="sm:hidden space-y-4 mt-4">
            {cars.map((car) => (
              <div key={car._id} className="border p-4 rounded shadow">
                <div className="flex gap-4 items-center">
                  <img
                    src={car.imageUrl}
                    alt={car.model}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{car.model}</h3>
                    <p className="text-sm text-gray-600">${car.price} / day</p>
                    <p className="text-sm text-gray-600">
                      Bookings: {car.bookingCount || 0}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm">
                  Availability:{" "}
                  <span
                    className={`badge ${
                      car.availability === "Available"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {car.availability}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Date Added:{" "}
                  {car.dateAdded
                    ? new Date(car.dateAdded).toLocaleDateString()
                    : "N/A"}
                </p>
                <div className="mt-2">
                  <button
                    onClick={() => handleEditClick(car)}
                    className="btn btn-sm btn-outline btn-primary w-full mb-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setShowModalCarId(car._id)}
                    className="btn btn-sm btn-outline btn-error w-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {showModalCarId && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow max-w-sm w-full">
                <p>
                  Are you sure you want to delete{" "}
                  <strong>
                    {
                      cars.find((car) => car._id === showModalCarId)?.model
                    }
                  </strong>
                  ?
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setShowModalCarId(null)}
                    className="btn btn-sm btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(showModalCarId)}
                    className="btn btn-sm btn-error"
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          )}

        
          {editingCar && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                <h3 className="text-lg font-semibold mb-4">Edit Car</h3>
                <div className="space-y-4">
                  <input
                    name="model"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Car Model"
                    value={editFormData.model || ""}
                    onChange={handleFormChange}
                  />
                  <input
                    name="price"
                    type="number"
                    className="input input-bordered w-full"
                    placeholder="Daily Rental Price"
                    value={editFormData.price || ""}
                    onChange={handleFormChange}
                  />
                  <select
                    name="availability"
                    className="select select-bordered w-full"
                    value={editFormData.availability || "Available"}
                    onChange={handleFormChange}
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                  <input
                    name="registrationNumber"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Registration Number"
                    value={editFormData.registrationNumber || ""}
                    onChange={handleFormChange}
                  />
                  <input
                    name="features"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Features (comma separated)"
                    value={editFormData.features || ""}
                    onChange={handleFormChange}
                  />
                  <textarea
                    name="description"
                    className="textarea textarea-bordered w-full"
                    placeholder="Description"
                    value={editFormData.description || ""}
                    onChange={handleFormChange}
                  />
                  <input
                    name="imageUrl"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Image URL"
                    value={editFormData.imageUrl || ""}
                    onChange={handleFormChange}
                  />
                  <input
                    name="location"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Location"
                    value={editFormData.location || ""}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setEditingCar(null)}
                    className="btn btn-sm btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="btn btn-sm btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyCars;
















