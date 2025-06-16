import { useLoaderData, Link } from "react-router";

const MyCars = () => {
  const data = useLoaderData();
  const cars = data?.data || [];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">My Cars</h2>

      {cars.length === 0 ? (
        <p>
          No cars added yet.{" "}
          <Link to="/add-car" className="text-blue-600 underline">
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
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={car.imageUrl} alt={car.model} />
                        </div>
                      </div>
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
                    <td>{car.dateAdded || "N/A"}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-outline btn-primary">
                          Edit
                        </button>
                        <button className="btn btn-sm btn-outline btn-error">
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
              <div
                key={car._id}
                className="border rounded-lg p-4 shadow-md space-y-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={car.imageUrl}
                    alt={car.model}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{car.model}</h3>
                    <p className="text-sm text-gray-600">${car.price} / day</p>
                    <p className="text-sm text-gray-600">
                      Bookings: {car.bookingCount || 0}
                    </p>
                  </div>
                </div>
                <p className="text-sm">
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
                  Date Added: {car.dateAdded || "N/A"}
                </p>
                <div className="gap-2 mt-2">
                  <button className="btn btn-sm btn-outline btn-primary w-full mb-3">
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline btn-error w-full">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyCars;













