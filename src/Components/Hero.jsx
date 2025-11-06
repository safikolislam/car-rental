import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const fetchCars = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cars`);
  return data;
};

const Hero = () => {
  const { data: cars = [], isLoading, isError } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });

  const availableCars = cars.filter((car) => car.availability === "Available");

  const [currentIndex, setCurrentIndex] = useState(0);


  if (availableCars.length > 0) {
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % availableCars.length);
    }, 5000);
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-base-100 rounded-lg overflow-hidden shadow-lg h-[300px] md:h-[400px] flex flex-col md:flex-row">
      <div className="md:w-1/2 p-6 flex flex-col justify-center text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Next Car Awaits You</h1>
        <p className="text-base-700 mb-6">Browse our cars and find your perfect ride!</p>
        <Link to="/AvailableCar">
          <button className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition">
            View Cars
          </button>
        </Link>
      </div>

      <div className="md:w-1/2 relative h-full">
        {!isLoading && !isError && availableCars.length > 0 && (
          <img
            src={availableCars[currentIndex].imageUrl}
            alt={availableCars[currentIndex].model}
            className="w-full h-full object-cover"
          />
        )}
        {isLoading && <p className="text-center mt-6">Loading cars...</p>}
        {isError && <p className="text-center mt-6 text-red-500">Error loading cars.</p>}
      </div>
    </div>
  );
};

export default Hero;









