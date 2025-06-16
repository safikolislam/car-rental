import { motion } from "motion/react"
import { fadeIn } from "./Animation";

const CustomerReviews = () => {
  return (
    <motion.section       variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }} className="bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="John Doe"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold">John Doe</h3>
            <div className="flex justify-center mt-2 text-yellow-400">
              ★★★★★
            </div>
            <p className="mt-4 text-gray-600">
              Great experience! The car was clean and the service was smooth. Will rent again!
            </p>
          </div>

    
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Jane Smith"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold">Jane Smith</h3>
            <div className="flex justify-center mt-2 text-yellow-400">
              ★★★★☆
            </div>
            <p className="mt-4 text-gray-600">
              Very reliable and affordable. The pickup process was quick and easy.
            </p>
          </div>

        
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://randomuser.me/api/portraits/men/76.jpg"
              alt="Carlos Rivera"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold">Carlos Rivera</h3>
            <div className="flex justify-center mt-2 text-yellow-400">
              ★★★★★
            </div>
            <p className="mt-4 text-gray-600">
              Excellent customer support and the car ran perfectly for my whole trip.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CustomerReviews;
