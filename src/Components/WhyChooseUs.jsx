import carIcon from '../assets/car Icon.png';
import Support from '../assets/help-desk.png';
import price from '../assets/money-bag.png';
import booking from '../assets/booking.png';

const MainPart = () => {
  return (
    <div className="py-12 px-4 bg-base-200 mt-30">
      <h1
        className="font-bold text-3xl text-center mb-10 text-base-content"
        data-aos="zoom-in"
        data-aos-duration="1200"
      >
        Why Choose Us
      </h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
     
        <div
          className="p-6 bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-center border border-base-300"
          data-aos="fade-right"
          data-aos-delay="100"
          data-aos-duration="1200"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-base-300 p-3 flex items-center justify-center">
            <img className="w-full" src={carIcon} alt="Car Icon" />
          </div>
          <h2 className="font-semibold text-lg mb-1 text-base-content">Wide Variety of Cars</h2>
          <p className="text-sm text-base-content/80">
            Choose from a diverse fleet of vehicles, including economy, SUVs, and luxury cars — perfect for every journey and budget.
          </p>
        </div>


        <div
          className="p-6 bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-center border border-base-300"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1200"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-base-300 p-3 flex items-center justify-center">
            <img className="w-full" src={price} alt="Price Icon" />
          </div>
          <h2 className="font-semibold text-lg mb-1 text-base-content">Affordable Prices</h2>
          <p className="text-sm text-base-content/80">
            We offer competitive and transparent pricing with no hidden fees, ensuring you get the best value for your rental.
          </p>
        </div>

      
        <div
          className="p-6 bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-center border border-base-300"
          data-aos="fade-left"
          data-aos-delay="500"
          data-aos-duration="1200"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-base-300 p-3 flex items-center justify-center">
            <img className="w-full" src={booking} alt="Booking Icon" />
          </div>
          <h2 className="font-semibold text-lg mb-1 text-base-content">Easy Booking Process</h2>
          <p className="text-sm text-base-content/80">
            Our streamlined online system allows you to book your car in minutes, from selection to confirmation.
          </p>
        </div>

     
        <div
          className="p-6 bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-center border border-base-300"
          data-aos="fade-up"
          data-aos-delay="700"
          data-aos-duration="1200"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-base-300 p-3 flex items-center justify-center">
            <img className="w-full" src={Support} alt="Support Icon" />
          </div>
          <h2 className="font-semibold text-lg mb-1 text-base-content">24/7 Customer Support</h2>
          <p className="text-sm text-base-content/80">
            Our dedicated support team is available around the clock to assist you with any questions or issues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPart;


