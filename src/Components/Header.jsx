import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import img from '../assets/carImage.png';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  const handleToggle = (e) => setTheme(e.target.checked ? 'dark' : 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  const handleLogout = async () => {
    try {
      await logOut();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getButtonClass = (path) =>
    `btn btn-sm rounded-md px-4 py-2 transition-all duration-200 ${
      location.pathname === path
        ? 'bg-blue-700 text-white border-blue-700'
        : 'bg-transparent border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-lg shadow-lg border-b border-base-300 ${
        theme === 'dark' ? 'bg-base-300/80' : 'bg-base-100/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-base-content">
            <img src={img} alt="Rentify Logo" className="w-10 h-10 rounded-full" />
            <span className="hidden sm:inline-block">Rentify Car</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-4">
            <Link
              to="/"
              className={`text-lg px-3 py-2 rounded-md ${
                location.pathname === '/' ? 'text-blue-700 font-bold' : 'text-base-content/80 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/AvailableCar"
              className={`text-lg px-3 py-2 rounded-md ${
                location.pathname === '/AvailableCar'
                  ? 'text-blue-700 font-bold'
                  : 'text-base-content/80 hover:text-blue-600'
              }`}
            >
              Available Cars
            </Link>

            {user && (
              <>
                <Link
                  to="/AddCar"
                  className={`text-lg px-3 py-2 rounded-md ${
                    location.pathname === '/AddCar'
                      ? 'text-blue-700 font-bold'
                      : 'text-base-content/80 hover:text-blue-600'
                  }`}
                >
                  Add Car
                </Link>
                <Link
                  to="/MyCars"
                  className={`text-lg px-3 py-2 rounded-md ${
                    location.pathname === '/MyCars'
                      ? 'text-blue-700 font-bold'
                      : 'text-base-content/80 hover:text-blue-600'
                  }`}
                >
                  My Cars
                </Link>
                <Link
                  to="/MyBookings"
                  className={`text-lg px-3 py-2 rounded-md ${
                    location.pathname === '/MyBookings'
                      ? 'text-blue-700 font-bold'
                      : 'text-base-content/80 hover:text-blue-600'
                  }`}
                >
                  My Bookings
                </Link>

                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-9 h-9 rounded-full border-2 border-blue-700 shadow-md ml-4"
                    title={user.displayName || user.email}
                  />
                )}

                <button
                  onClick={handleLogout}
                  className="btn btn-sm rounded-md px-4 py-2 bg-blue-700 text-white border-blue-700 hover:bg-blue-800 ml-2"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <Link to="/SignUp" className={getButtonClass('/SignUp')}>
                Sign Up
              </Link>
            )}
          </nav>

          {/* Theme & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <label className="swap swap-rotate text-base-content/80">
              <input type="checkbox" onChange={handleToggle} checked={theme === 'dark'} />
              {/* Sun */}
              <svg
                className="swap-off fill-current w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,6.34a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41L5.64,4.93a1,1,0,0,0-1.41,1.41ZM18.36,6.34a1,1,0,0,0,.71-.29l.71-.71a1,1,0,0,0-1.41-1.41l-.71.71A1,1,0,0,0,18.36,6.34ZM12,8A4,4,0,1,0,16,12,4,4,0,0,0,12,8Zm4.95,5.05a1,1,0,0,0-1.41,1.41l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19Z" />
              </svg>
              {/* Moon */}
              <svg
                aria-label="moon"
                className="swap-on fill-current w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.18,8.18,0,0,1,.73-3.37,1,1,0,0,0-.14-1.05h0A9,9,0,1,0,21.64,13Z" />
              </svg>
            </label>

            <button
              className="lg:hidden p-2 rounded-md text-base-content hover:bg-base-300 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            ></div>

            <div className="absolute top-0 left-0 w-full bg-base-100 shadow-xl transform transition-transform duration-300 ease-out">
              <div className="flex justify-between items-center p-4 border-b border-base-300">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="w-7 h-7 text-base-content" />
                </button>
              </div>
              <nav className="flex flex-col space-y-3 p-4">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg py-3 px-4 rounded hover:bg-blue-100"
                >
                  Home
                </Link>
                <Link
                  to="/AvailableCar"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg py-3 px-4 rounded hover:bg-blue-100"
                >
                  Available Cars
                </Link>

                {user && (
                  <>
                    <Link
                      to="/AddCar"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg py-3 px-4 rounded hover:bg-blue-100"
                    >
                      Add Car
                    </Link>
                    <Link
                      to="/MyCars"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg py-3 px-4 rounded hover:bg-blue-100"
                    >
                      My Cars
                    </Link>
                    <Link
                      to="/MyBookings"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg py-3 px-4 rounded hover:bg-blue-100"
                    >
                      My Bookings
                    </Link>

                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-12 h-12 rounded-full border-2 border-blue-600 shadow-md my-2"
                      />
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full btn rounded-md px-4 py-3 bg-blue-700 text-white mt-2"
                    >
                      Logout
                    </button>
                  </>
                )}

                {!user && (
                  <Link
                    to="/SignUp"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center btn rounded-md px-4 py-3 bg-blue-700 text-white mt-2"
                  >
                    Sign Up
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;



















