import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const fetchCarById = async (carId) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cars/${carId}`);
  return data;
};

const CarDetails = () => {
  const { carId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "You must log in to view car details.",
        icon: "warning",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
    }
  }, [user, navigate]);

  const { data: car, isLoading, isError } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => fetchCarById(carId),
    enabled: !!user, 
  });

  if (!user) return null; 
  if (isLoading) return <Loading />;
  if (isError)
    return <div className="p-8 text-center text-error">Error loading car details.</div>;
  if (!car)
    return <div className="p-8 text-center text-gray-500">Car not found.</div>;

  const handleBooking = async () => {
    Swal.fire({
      title: "Confirm Booking",
      html: `
        <strong>Model:</strong> ${car.model} <br/>
        <strong>Price Per Day:</strong> $${car.price} <br/>
        <strong>Features:</strong> ${car.features || "N/A"} <br/>
        <strong>Description:</strong> ${car.description || "No description"} <br/>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm Booking",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const bookingData = {
            carId: car._id,
            userEmail: user.email,
            carModel: car.model,
            pricePerDay: car.price,
            totalPrice: car.price,
            bookingDate: new Date().toISOString(),
            status: "Confirmed",
            carImage: car.imageUrl,
          };

          await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingData);

          Swal.fire(
            "Booked!",
            `Your booking for ${car.model} is confirmed.`,
            "success"
          );
        } catch (error) {
          Swal.fire("Error", "Failed to book car.", "error");
        }
      }
    });
  };

  return (
    <div className="mt-20 min-h-screen p-4 bg-base-100 text-base-content">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
       
          <div className="flex-1">
            <img
              src={car.imageUrl}
              alt={car.model}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>

       
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{car.model}</h1>
            <p className="text-lg"><strong>Price Per Day:</strong> ${car.price}</p>
            <p className="text-lg"><strong>Features:</strong> {car.features || "N/A"}</p>
            <p className="text-lg"><strong>Description:</strong> {car.description || "No description"}</p>
            <p className="text-lg"><strong>Year:</strong> {car.year || "N/A"}</p>
            <p className="text-lg"><strong>Mileage:</strong> {car.mileage || "N/A"} km</p>
            <p className="text-lg"><strong>Fuel Type:</strong> {car.fuelType || "N/A"}</p>
            <p className="text-lg"><strong>Seats:</strong> {car.seats || "N/A"}</p>
            <p className="text-lg"><strong>Transmission:</strong> {car.transmission || "N/A"}</p>

            <button
              onClick={handleBooking}
              className="btn btn-primary mt-4 w-36 flex items-center justify-center gap-2"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;










