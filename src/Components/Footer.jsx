import logo from  '../assets/carImage.png'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center py-8">
   
      <div className="flex flex-col items-center">
        <img src={logo} alt="Logo" className="h-12 mb-2" />
        <h2 className="text-xl font-semibold">Rentify Car</h2>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        &copy; {new Date().getFullYear()} Rentify Car. All rights reserved.
      </p>

  
      <div className="flex justify-center mt-4 space-x-6 text-gray-600">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700"
        >
          <FaLinkedinIn size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
