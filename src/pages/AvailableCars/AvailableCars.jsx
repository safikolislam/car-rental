import { useLoaderData } from "react-router";
import { useState } from "react";
import { Link } from "react-router";

const AvailableCar = () => {
  const data = useLoaderData();
  const cars = data?.data || [];

  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("lowestPrice"); 

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  const sortedCars = [...cars].sort((a, b) => {
    switch (sortOption) {
      case "lowestPrice":
        return a.price - b.price;
      case "highestPrice":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2 font-semibold">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded p-1"
          >
            <option value="lowestPrice">Price (Lowest First)</option>
            <option value="highestPrice">Price (Highest First)</option>
          </select>
        </div>
        <button
          onClick={toggleViewMode}
          className="border px-3 py-1 rounded hover:bg-gray-200"
        >
          {viewMode === "grid" ? "Switch to List View" : "Switch to Grid View"}
        </button>
      </div>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            : "flex flex-col gap-4"
        }
      >
        {sortedCars.map((car) => (
          <div
            key={car.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={car.image}
              alt={car.model}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h2 className="text-xl font-semibold mb-1">{car.model}</h2>
            <p className="text-gray-600 mb-1">Price: ${car.price}</p>
            <Link
              to={`/car/${car.id}`}
              className="inline-block mt-auto bg-red-300 text-white px-4 py-2 rounded"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCar;

