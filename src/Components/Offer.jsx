import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import Loading from "./Loading";

const fetchCars = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cars`);
  return data;
};

const SpecialOffers = () => {
  const navigate = useNavigate();

  const { data: cars = [], isLoading, isError } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load promotions
      </div>
    );

  const displayedCars = cars.slice(0, 2);
  const discountPercentage = 15;

  return (
    <section className="max-w-7xl mx-auto py-16 bg-base-100 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-blue-600 dark:text-blue-400">
          Special Offers
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {displayedCars.map((car) => {
            const discountedPrice = (car.price * (100 - discountPercentage)) / 100;

            return (
              <div
                key={car._id}
                className="relative card bg-base-200 shadow-2xl rounded-3xl overflow-hidden cursor-pointer border border-base-300 hover:shadow-3xl hover:bg-base-300 transition-all"
                onClick={() => navigate("/AvailableCar")}
              >
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                  {discountPercentage}% OFF
                </div>

                <figure className="h-64 overflow-hidden">
                  <img
                    src={car.imageUrl}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="card-body items-center text-center p-6">
                  <h3 className="text-2xl font-bold mb-2 text-base-content">
                    {car.name}
                  </h3>
                  <p className="text-base-content/70 mb-4">
                    {car.description ||
                      "Experience comfort, power, and style in one ride."}
                  </p>

                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
                    <span className="line-through text-gray-400 mr-2">
                      ${car.price}
                    </span>
                    <span>${discountedPrice.toFixed(2)}</span>/day
                  </p>

                  <button
                    className="btn btn-primary rounded-full px-8 py-2 text-white"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;


















