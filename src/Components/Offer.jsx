import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Offer = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/latest-cars`);
        
        const shuffled = data.sort(() => 0.5 - Math.random());
        setCars(shuffled.slice(0, 2));
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Special Offers</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {cars.map((car, index) => (
            <motion.div
              key={car._id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer"
              initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                y: [0, -5, 0], 
                transition: { duration: 0.4, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <img
                src={car.imageUrl}
                alt={car.model}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
              <p className="text-gray-600 mb-4">{car.description || "Special car offer!"}</p>
              <p className="text-lg font-bold text-red-600 mb-4">${car.price}/day</p>
          
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offer;



