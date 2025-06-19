const CarCard = ({ car }) => {
  const { imageUrl, model, price } = car;

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={model || "Car Image"}
            className="object-cover w-full h-56"
          />
        ) : (
          <div className="bg-gray-200 w-full h-56 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{model || "Car Name"}</h2>
        <p className="text-lg font-semibold">Price: ${price || "N/A"}</p>
        <p>Rent this car at just ${price || "N/A"} per day!</p>
      </div>
    </div>
  );
};

export default CarCard;

