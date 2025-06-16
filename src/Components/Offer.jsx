import img15 from '../assets/blue-midsize-family-urban-suv-car-white-background-3d-illustration_101266-20364.jpg'
import img75 from '../assets/15  car.jpg'
import { Link } from 'react-router';
const Offer = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Special Offers</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
      
          <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
            <img
              src={img15}
              alt="Weekend rental offer"
              className="w-full md:w-1/2 h-60 object-cover"
            />
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Get 15% off for weekend rentals!</h3>
                <p className="text-gray-600 mb-4">
                  Book now and enjoy a discounted rate on all weekend bookings.
                </p>
              </div>
             <Link to="/MyBookings"><button className="self-start px-4 py-2 bg-red-200 text-white rounded hover:bg-blue-700 transition">
                Book Now
              </button></Link>
            </div>
          </div>

         
          <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
            <img
              src={img75}
              alt="Luxury car holiday offer"
              className="w-full md:w-1/2 h-60 object-cover"
            />
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Luxury cars at $99/day this holiday season!
                </h3>
                <p className="text-gray-600 mb-4">
                  Drive premium cars for less — only for a limited time.
                </p>
              </div>
              <button className="self-start px-4 py-2 bg-red-200 text-white rounded hover:bg-blue-700 transition">
                Learn More
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Offer;

