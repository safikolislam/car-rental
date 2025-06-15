const CarCard = ({ car }) => {
  const { imageUrl, model, price } = car;

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={imageUrl}
          alt={model || "Car Image"}
          className="object-cover w-full h-56"
        />
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
