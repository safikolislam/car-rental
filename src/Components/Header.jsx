// Header.jsx
import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router' // FIX: use 'react-router-dom' for <Link> and hooks
import { AuthContext } from '../Provider/AuthProvider'
import img from '../assets/carImage.png'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const handleToggle = (e) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  }

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.querySelector('html').setAttribute('data-theme', theme)
  }, [theme])

  const { user, logOut } = useContext(AuthContext)

  const location = useLocation() 
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  
  const isActive = (path) =>
    location.pathname === path
      ? 'text-primary font-bold' 
      : 'text-base-content/80 hover:text-primary transition-colors' 

  const handleLogout = async () => {
    try {
      await logOut()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/AvailableCar', label: 'Available Cars' },
    ...(user
      ? [
          { path: '/AddCar', label: 'Add Car' },
          { path: '/MyCars', label: 'My Cars' },
          { path: '/MyBookings', label: 'My Bookings' },
        ]
      : []),
  ]

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-lg shadow-lg border-b border-base-300 ${
        theme === 'dark' ? 'bg-base-300/80' : 'bg-base-100/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
     
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold text-base-content"
          >
            <img src={img} alt="Rentify Logo" className="w-10 h-10 rounded-full" />
            <span className="hidden sm:inline-block">Rentify Car</span>
          </Link>

        
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
             
                className={`text-lg transition-colors ${isActive(path)}`}
              >
                {label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-3">
                {user.photoURL && (
                
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-9 h-9 rounded-full border-2 border-primary shadow-md"
                    title={user.displayName || user.email} ></img>
                )}
                <button
                  onClick={handleLogout}
                  
                  className="btn btn-sm btn-primary hover:bg-opacity-80 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/Login"
                 
                  className="btn btn-sm btn-primary hover:bg-opacity-80 transition"
                >
                  Login
                </Link>
                <Link
                  to="/SignUp"
                
                  className="btn btn-sm btn-outline btn-primary transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

      
          <div className="flex items-center gap-2">
         
            <label className="swap swap-rotate text-base-content/80">
                <input
                    type="checkbox"
                    className="theme-controller"
                    onChange={handleToggle}
                    checked={theme === 'dark'}
                />
            
              <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,6.34a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41L5.64,4.93a1,1,0,0,0-1.41,1.41ZM18.36,6.34a1,1,0,0,0,.71-.29l.71-.71a1,1,0,0,0-1.41-1.41l-.71.71A1,1,0,0,0,18.36,6.34ZM12,8A4,4,0,1,0,16,12,4,4,0,0,0,12,8Zm4.95,5.05a1,1,0,0,0-1.41,1.41l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19Z" />
                </svg>
              
                <svg aria-label="moon" className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.18,8.18,0,0,1,.73-3.37,1,1,0,0,0-.14-1.05h0A9,9,0,1,0,21.64,13Z" />
                </svg>
            </label>

            <button
              className="lg:hidden p-2 rounded-lg text-base-content hover:bg-base-300 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

      
        {isMenuOpen && (
          <div
            className={`lg:hidden flex flex-col space-y-1 pb-4 border-t mt-2 bg-base-100 shadow-xl`}
          >
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`block px-4 py-3 text-lg rounded-lg ${isActive(path)}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            {user ? (
              <div className="flex flex-col items-start gap-3 px-4 pt-4">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="User"
                 
                    className="w-10 h-10 rounded-full border-2 border-primary shadow-md"
                    title={user.displayName || user.email}
                  />
                )}
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                
                  className="w-full btn btn-primary transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-4 pt-4">
                <Link
                  to="/Login"
                  onClick={() => setIsMenuOpen(false)}
             
                  className="w-full btn btn-primary text-center"
                >
                  Login
                </Link>
                <Link
                  to="/SignUp"
                  onClick={() => setIsMenuOpen(false)}
                  
                  className="w-full btn btn-outline btn-primary text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

