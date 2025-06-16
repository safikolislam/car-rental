import carIcon from '../assets/car Icon.png';
import Support from '../assets/help-desk.png'
import price from '../assets/money-bag.png'
import booking from '../assets/booking.png'


const MainPart = () => {
    return (
        <>
        <div>
            <h1 className="font-bold text-2xl text-center mt-5">Why Choose Us</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 p-4">
              <div className="p-4 bg-gradient-to-tr from-red-300 to-blue-100 rounded-md text-center">
                <img className="w-15 mx-auto mb-2 rounded-full bg-white p-2" src={carIcon} alt="Car Icon" />
                <h2 className="font-semibold text-lg mb-1">Wide Variety of Cars</h2>
                <p className="text-sm text-gray-700">
                  Choose from a diverse fleet of vehicles, including economy, SUVs, and luxury cars — perfect for every journey and budget.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-tr from-red-300 to-blue-100 rounded-md text-center">
                <img className="w-15 mx-auto mb-2 rounded-full bg-white p-2" src={price} alt="Car Icon" />
                <h2 className="font-semibold text-lg mb-1">Affordable prices</h2>
                <p className="text-sm text-gray-700">
                  Choose from a diverse fleet of vehicles, including economy, SUVs, and luxury cars — perfect for every journey and budget.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-tr from-red-300 to-blue-100 rounded-md text-center">
                <img className="w-15 mx-auto mb-2 rounded-full bg-white p-2" src={booking} alt="Car Icon" />
                <h2 className="font-semibold text-lg mb-1">Easy Booking Process</h2>
                <p className="text-sm text-gray-700">
                  Choose from a diverse fleet of vehicles, including economy, SUVs, and luxury cars — perfect for every journey and budget.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-tr from-red-300 to-blue-100 rounded-md text-center">
                <img className="w-15 mx-auto mb-2 rounded-full bg-white p-2" src={Support} alt="Car Icon" />
                <h2 className="font-semibold text-lg mb-1">Customer Support</h2>
                <p className="text-sm text-gray-700">
                  Choose from a diverse fleet of vehicles, including economy, SUVs, and luxury cars — perfect for every journey and budget.
                </p>
              </div>
            </div>
        </div>
        </>
    );
};

export default MainPart;
