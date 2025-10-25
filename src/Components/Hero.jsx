
import Image from '../assets/pexels-mikebirdy-1335077.jpg';
import { Link } from 'react-router';

const Hero = () => {
  return (
    <div className="hero rounded-md  h-[500px] max-w-7xl mx-auto mb-5 relative">
      <img src={Image} alt="Hero background" className="w-full h-full object-cover absolute inset-0 z-0" />
      <div className="hero-overlay  bg-opacity-60 absolute inset-0 z-10"></div>
      <div className="hero-content text-neutral-content text-center relative z-20">
        <div className="max-w-md">
        
          <p className="mb-5 text-3xl">
           "Your Next Car Awaits You."

          </p>
          <Link to="/AvailableCar"><button className="btn ">View Available Cars</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
