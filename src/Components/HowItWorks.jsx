import { motion } from "motion/react"
import { fadeIn } from "./Animation";

const HowItWorks = () => {
  return (
    <motion.section
        variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
    
    
    className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Renting a car with us is fast and simple. Just follow these three easy steps and hit the road!
        </p>

        <div className="grid gap-10 md:grid-cols-3 text-left">
          <div className="flex flex-col items-start">
            <div className="bg-indigo-100 text-indigo-600 text-2xl w-12 h-12 flex items-center justify-center rounded-full mb-4 font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Your Car</h3>
            <p className="text-gray-600">
              Browse our wide selection of vehicles to find the perfect fit for your trip or daily needs.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <div className="bg-indigo-100 text-indigo-600 text-2xl w-12 h-12 flex items-center justify-center rounded-full mb-4 font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Book Online</h3>
            <p className="text-gray-600">
              Select your rental period, location, and extras. Pay securely through our online system.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <div className="bg-indigo-100 text-indigo-600 text-2xl w-12 h-12 flex items-center justify-center rounded-full mb-4 font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Pick Up & Drive</h3>
            <p className="text-gray-600">
              Pick up your car at your selected location — and you’re off! Drive safely and enjoy the journey.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
