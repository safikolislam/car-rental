import logo from '../assets/carImage.png';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content text-center py-8">
  
      <div className="flex flex-col items-center">
        <img src={logo} alt="Logo" className="h-12 mb-2" />
        <h2 className="text-xl font-semibold">Rentify Car</h2>
      </div>

  
      <p className="text-sm text-base-content/70 mt-4">
        &copy; {currentYear} Rentify Car. All rights reserved.
      </p>

     
      <div className="flex justify-center mt-4 space-x-6 text-base-content/80">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition duration-300"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition duration-300"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition duration-300"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700 transition duration-300"
        >
          <FaLinkedinIn size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
