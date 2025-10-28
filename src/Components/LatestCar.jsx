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
    return (
      <p className="text-center mt-10 text-error">
        Error: {error.message}
      </p>
    );
  if (!cars || cars.length === 0)
    return (
      <p className="text-center mt-10 text-base-content/60">
        No cars available.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-base-content">
        Latest Cars
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div
            key={car._id}
            className="card bg-base-100 shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300 overflow-hidden"
          >
            <figure className="relative h-56">
              <img
                src={car.imageUrl || "https://via.placeholder.com/300x200"}
                alt={car.model || "Car Image"}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  car.availability === "Available"
                    ? "bg-success text-success-content"
                    : "bg-error text-error-content"
                }`}
              >
                {car.availability}
              </span>
            </figure>

            <div className="card-body p-5 text-base-content">
              <h3 className="text-lg font-semibold">{car.name}</h3>
              <p className="mt-1 text-sm opacity-80">Model: {car.model}</p>
              <p className="mt-1 text-sm opacity-80">
                Registration: {car.registration}
              </p>
              <p className="mt-1 text-sm opacity-80">Location: {car.location}</p>

              <p className="mt-3 font-bold text-lg text-primary">
                ${car.price}
              </p>

              {car.features && (
                <p className="mt-1 text-sm opacity-70">
                  Features: {car.features}
                </p>
              )}

              <p className="mt-2 text-xs opacity-60">
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




