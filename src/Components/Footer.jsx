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

    <footer className="bg-base-200 text-base-content py-16">
      <div className="container mx-auto px-4">
        
      
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-base-content/10 pb-10 mb-10">
          
        
          <div className="col-span-2 md:col-span-2 space-y-4 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
           
              <img 
                src={logo} 
                alt="Logo" 
                className="h-12 mb-2" 
              
              />
              <h2 className="text-2xl font-bold">Rentify Car</h2>
            </div>
         
            <p className="text-sm text-base-content/70 max-w-sm">
              Your trusted partner for hassle-free car rentals. Explore the world on your terms.
            </p>
          </div>

         
          <div className="col-span-1">
           
            <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-base-content/70 hover:text-primary transition duration-200">Home</a></li>
              <li><a href="/AvailableCar" className="text-base-content/70 hover:text-primary transition duration-200">Available Cars</a></li>
              <li><a href="/faq" className="text-base-content/70 hover:text-primary transition duration-200">FAQ</a></li>
             
            </ul>
          </div>

        
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-primary">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-base-content/70 hover:text-primary transition duration-200">About Us</a></li>
              <li><a href="/careers" className="text-base-content/70 hover:text-primary transition duration-200">Careers</a></li>
              <li><a href="/blog" className="text-base-content/70 hover:text-primary transition duration-200">Blog</a></li>
              <li><a href="/sitemap" className="text-base-content/70 hover:text-primary transition duration-200">Sitemap</a></li>
            </ul>
          </div>

         
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-primary">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/terms" className="text-base-content/70 hover:text-primary transition duration-200">Terms of Service</a></li>
              <li><a href="/privacy" className="text-base-content/70 hover:text-primary transition duration-200">Privacy Policy</a></li>
              <li><a href="/cookie" className="text-base-content/70 hover:text-primary transition duration-200">Cookie Policy</a></li>
              <li><a href="/licenses" className="text-base-content/70 hover:text-primary transition duration-200">Licenses</a></li>
            </ul>
          </div>

        </div>

      
        <div className="flex flex-col md:flex-row justify-between items-center">
          

          <p className="text-sm text-base-content/70 order-2 md:order-1 mt-6 md:mt-0">
            &copy; {currentYear} Rentify Car. All rights reserved.
          </p>

          <div className="flex space-x-6 text-base-content/80 order-1 md:order-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/70 hover:text-blue-600 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/70 hover:text-blue-400 transition duration-300"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/70 hover:text-pink-500 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-content/70 hover:text-blue-700 transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
