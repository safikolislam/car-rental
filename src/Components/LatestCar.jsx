import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";

const fetchLatestCars = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/latest-cars`);
  return data;
};

const LatestCars = () => {
  const { data: cars, isLoading, isError, error } = useQuery({
    queryKey: ["latestCars"],
    queryFn: fetchLatestCars,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;
  if (!cars || cars.length === 0)
    return <p className="text-center mt-10 text-gray-500">No cars available.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Latest Cars
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 overflow-hidden"
          >
            <div className="relative h-56">
              <img
                src={car.imageUrl || "https://via.placeholder.com/300x200"}
                alt={car.model || "Car Image"}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  car.availability === "Available"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {car.availability}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
              <p className="text-gray-600 mt-1 text-sm">Model: {car.model}</p>
              <p className="text-gray-600 mt-1 text-sm">
                Registration: {car.registration}
              </p>
              <p className="text-gray-600 mt-1 text-sm">Location: {car.location}</p>
              <p className="text-gray-800 mt-2 font-bold text-lg">${car.price}</p>
              {car.features && (
                <p className="text-gray-500 mt-1 text-sm">Features: {car.features}</p>
              )}
              <p className="text-gray-400 mt-2 text-xs">
                Added on: {new Date(car.dateAdded).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCars;



