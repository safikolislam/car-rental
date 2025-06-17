import { useLoaderData } from "react-router";

const CarDetails = () => {
  const car = useLoaderData();


  if (!car) {
    return <div className="text-center mt-10 text-red-500">Car data not found.</div>;
  }

  const { imageUrl, model, price, availability } = car;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{model || "Car Details"}</h1>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt={model}
          className="w-full rounded-lg mb-6 shadow-md"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded mb-6">
          No image available
        </div>
      )}

      <p className="mb-2"><strong>Price Per Day:</strong> ${price}</p>
      <p className="mb-2"><strong>Availability:</strong> {availability ? "Available" : "Not Available"}</p>
    </div>
  );
};

export default CarDetails;




