import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const fetchCars = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cars`);
  return data;
};

const AvailableCars = () => {
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: cars = [], isLoading, isError } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });

  if (isLoading)
    return <div className="p-10 text-center text-lg">Loading cars...</div>;
  if (isError)
    return <div className="p-10 text-center text-red-500">Error loading cars.</div>;
  if (cars.length === 0)
    return <div className="p-10 text-center text-gray-500">No cars available.</div>;


  const availableOnlyCars = cars.filter(car => car.availability === "Available");

 
  const searchedCars = availableOnlyCars.filter((car) =>
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const sortedCars = [...searchedCars].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      case "oldest":
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      case "priceLow":
        return a.price - b.price;
      case "priceHigh":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <section className="min-h-screen bg-base-100 text-base-content py-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">

      
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">

          <div className="flex gap-3">
            <button
              onClick={() => setView("grid")}
              className={`btn btn-sm rounded-md shadow-md transition-all ${
                view === "grid" ? "btn-primary" : "btn-outline"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setView("list")}
              className={`btn btn-sm rounded-md shadow-md transition-all ${
                view === "list" ? "btn-primary" : "btn-outline"
              }`}
            >
              List View
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered input-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select select-bordered select-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>

     
        <div
          className={`${
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              : "flex flex-col gap-6"
          }`}
        >
          {sortedCars.length > 0 ? (
            sortedCars.map((car) => (
              <div
                key={car._id}
                className={`card bg-base-200 border border-base-300 shadow-md hover:shadow-lg transition-all ${
                  view === "grid" ? "rounded-xl" : "card-side rounded-lg"
                }`}
              >
                <figure className={`${view === "grid" ? "p-3" : "p-2"}`}>
                  <img
                    src={car.imageUrl}
                    alt={car.model}
                    className={`${
                      view === "grid"
                        ? "h-48 w-full object-cover rounded-lg"
                        : "h-40 w-48 object-cover rounded-lg"
                    }`}
                  />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-lg font-semibold">{car.model}</h2>
                  <p> {car.features}</p>
                  <p className="text-sm text-gray-500">
                    Added on: {new Date(car.dateAdded).toLocaleDateString()}
                  </p>
                  <p className="text-primary font-semibold text-base">${car.price}</p>
                  <div className="card-actions justify-end mt-3">
                    <Link
                      to={`/CarDetails/${car._id}`}
                      className="btn btn-primary btn-sm rounded-md"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 mt-10">
              No available cars found for “{searchTerm}”.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AvailableCars;






