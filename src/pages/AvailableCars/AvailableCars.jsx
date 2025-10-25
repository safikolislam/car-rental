
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

  const { data: cars = [], isLoading, isError } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });

  if (isLoading) return <div className="p-8 text-center">Loading cars...</div>;
  if (isError) return <div className="p-8 text-center text-error">Error loading cars.</div>;
  if (cars.length === 0) return <div className="p-8 text-center text-gray-500">No cars available.</div>;


  const sortedCars = [...cars].sort((a, b) => {
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
    <div className="min-h-screen p-4 bg-base-100 text-base-content">
  
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`btn btn-sm ${view === "grid" ? "btn-primary" : "btn-outline"}`}
          >
            Grid View
          </button>
          <button
            onClick={() => setView("list")}
            className={`btn btn-sm ${view === "list" ? "btn-primary" : "btn-outline"}`}
          >
            List View
          </button>
        </div>

        <div>
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
      </div>

     
      <div
        className={`${
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }`}
      >
        {sortedCars.map((car) => (
          <div
            key={car._id}
            className={`card ${view === "grid" ? "" : "card-side"} bg-base-200 shadow-xl`}
          >
            <figure>
              <img
                src={car.imageUrl}
                alt={car.model}
                className={`${view === "grid" ? "h-50 w-full object-cover" : "h-55 w-48 object-cover"}`}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{car.model}</h2>
              <p>Price: ${car.price}</p>
              <p>Added on: {new Date(car.dateAdded).toLocaleDateString()}</p>
              <div className="card-actions justify-end">
                <Link to={`/CarDetails/${car._id}`} className="btn btn-primary btn-sm">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;

