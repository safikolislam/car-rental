import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from '../../Components/Loading';


const fetchCarDetails = async ({ queryKey }) => {
 
    const carId = queryKey[1]; 
    if (!carId) throw new Error("Car ID is missing");
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cars/${carId}`);
    return data;
};

const CarDetails = () => {
 
    const { carId } = useParams(); 

    const { data: car, isLoading, isError } = useQuery({
        queryKey: ["carDetails", carId],
        queryFn: fetchCarDetails,
       
        enabled: !!carId, 
    });

    if (isLoading) return <Loading></Loading>;
    if (isError) return <div className="p-8 text-center text-error">Error loading car details. Please try again.</div>;
    if (!car) return <div className="p-8 text-center text-base-200">Car not found.</div>;


    const formatFeatures = (features) => {
        if (!features || features.length === 0) return "No features listed.";
        return features.map((f, index) => (
            <span key={index} className="badge badge-lg badge-neutral mr-2 mb-2">
                {f}
            </span>
        ));
    };

    return (
        <div className="min-h-screen p-4 md:p-12 bg-base-100 text-base-content">
            <div className="max-w-4xl mx-auto bg-base-200 shadow-2xl rounded-xl p-6 md:p-10">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 text-primary">{car.model}</h1>
                    <p className="text-xl text-success font-semibold">Price Per Day: ${car.price}</p>
                </div>

            
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Images </h2>
                    <figure className="aspect-video overflow-hidden rounded-lg shadow-lg">
                        <img 
                            src={car.imageUrl || 'placeholder.jpg' } 
                            alt={car.model}
                            className="w-full h-full object-cover"
                        />
                    </figure>
                   
                  
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Detailed Information 

                        </h2>
                        <div className="space-y-3">
                            <p>
                                <span className="font-medium">Model:</span> {car.model}
                            </p>
                            <p>
                                <span className="font-medium">Price Per Day:</span> <span className="text-lg font-bold text-success">${car.price}</span>
                            </p>
                            <p>
                                <span className="font-medium">Availability:</span> 
                                <span className={`badge ml-2 ${car.isAvailable ? 'badge-success' : 'badge-error'}`}>
                                    {car.isAvailable ? 'Available Now' : 'Booked'}
                                </span>
                            </p>
                            <p>
                                <span className="font-medium">Date Listed:</span> {new Date(car.dateAdded).toLocaleDateString()}
                            </p>
                            {car.make && <p><span className="font-medium">Make:</span> {car.make}</p>}
                            {car.year && <p><span className="font-medium">Year:</span> {car.year}</p>}
                        </div>
                    </div>

                  
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Key Features </h2>
                        <div className="flex flex-wrap">
                            {formatFeatures(car.features)}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-base-300">
                    <h2 className="text-2xl font-semibold mb-4">Description </h2>
                    <p className="text-lg text-base-content leading-relaxed">
                        {car.description || "No detailed description available for this vehicle."}
                    </p>
                </div>

                <div className="mt-10 flex justify-center">
                    <button className="btn btn-primary btn-lg shadow-xl hover:shadow-2xl">
                        Proceed to Booking 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;





