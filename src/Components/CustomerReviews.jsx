const CustomerReviews = () => {
  return (
    <section className="bg-base-200 py-12 px-4 my-10 mt-50">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Title */}
        <h2 
          className="text-3xl text-base-content font-bold mb-8"
          data-aos="zoom-in"
          data-aos-duration="1200"
        >
          What Our Customers Say
        </h2>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div 
            className="bg-base-100 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
            data-aos="zoom-in-up"
            data-aos-delay="100"
            data-aos-duration="1200"
          >
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="John Doe"
              className="w-16 h-16 rounded-full mx-auto border-2 border-base-300"
            />
            <h3 className="mt-4 text-xl font-semibold text-base-content">John Doe</h3>
            <div className="flex justify-center mt-2 text-yellow-400 text-lg">★★★★★</div>
            <p className="mt-4 text-base-content/80">
              Great experience! The car was clean and the service was smooth. Will rent again!
            </p>
          </div>

          {/* Card 2 */}
          <div 
            className="bg-base-100 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
            data-aos="zoom-in-up"
            data-aos-delay="300"
            data-aos-duration="1200"
          >
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Jane Smith"
              className="w-16 h-16 rounded-full mx-auto border-2 border-base-300"
            />
            <h3 className="mt-4 text-xl font-semibold text-base-content">Jane Smith</h3>
            <div className="flex justify-center mt-2 text-yellow-400 text-lg">★★★★☆</div>
            <p className="mt-4 text-base-content/80">
              Very reliable and affordable. The pickup process was quick and easy.
            </p>
          </div>

          {/* Card 3 */}
          <div 
            className="bg-base-100 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
            data-aos="zoom-in-up"
            data-aos-delay="500"
            data-aos-duration="1200"
          >
            <img
              src="https://randomuser.me/api/portraits/men/76.jpg"
              alt="Carlos Rivera"
              className="w-16 h-16 rounded-full mx-auto border-2 border-base-300"
            />
            <h3 className="mt-4 text-xl font-semibold text-base-content">Carlos Rivera</h3>
            <div className="flex justify-center mt-2 text-yellow-400 text-lg">★★★★★</div>
            <p className="mt-4 text-base-content/80">
              Excellent customer support and the car ran perfectly for my whole trip.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;


