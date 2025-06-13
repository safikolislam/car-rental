import { useContext } from 'react'
import { Link, useLocation } from 'react-router'
import { AuthContext } from '../Provider/AuthProvider'
import img from '../assets/carImage.png'

const Header = () => {
  const { user, logOut } = useContext(AuthContext)
  const location = useLocation()

  const isActive = (path) => (location.pathname === path ? 'underline text-secondary' : '')

  const menuItems = (
    <>
      <li>
        <Link className={`hover:underline ${isActive('/')}`} to='/'>
          Home
        </Link>
      </li>
      <li>
        <Link className={`hover:underline ${isActive('/AvailableCar')}`} to='/AvailableCar'>
          Available Cars
        </Link>
      </li>
      {user ? (
        <>
          <li>
            <Link className={`hover:underline ${isActive('/AddCar')}`} to='/AddCar'>
              Add Car
            </Link>
          </li>
          <li>
            <Link className={`hover:underline ${isActive('/MyCars')}`} to='/MyCars'>
              My Cars
            </Link>
          </li>
          <li>
            <Link className={`hover:underline ${isActive('/MyBookings')}`} to='/MyBookings'>
              My Bookings
            </Link>
          </li>
          <li>
            <button onClick={logOut} className='btn btn-warning w-full text-left'>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link className={`hover:underline ${isActive('/Login')}`} to='/Login'>
              Login
            </Link>
          </li>
          <li>
            <Link className={`hover:underline ${isActive('/SignUp')}`} to='/SignUp'>
              Sign Up
            </Link>
          </li>
        </>
      )}
    </>
  )

  return (
    <div className='navbar bg-base-100 shadow-sm justify-between px-4'>
   
      <div className='navbar-start flex items-center gap-2'>
      
        <div className='lg:hidden'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              {menuItems}
            </ul>
          </div>
        </div>

        <Link to='/' className='btn btn-ghost text-xl text-secondary flex items-center'>
          <img src={img} alt='Logo' className='w-10 h-10 mr-2' />
          Rentify Car
        </Link>
      </div>

 
      <div className='navbar-center'></div>

   
      <div className='navbar-end hidden lg:flex'>
        <ul className='menu menu-horizontal px-1 items-center'>
          <li>
            <Link className={`hover:underline ${isActive('/')}`} to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link className={`hover:underline ${isActive('/AvailableCar')}`} to='/AvailableCar'>
              Available Cars
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link className={`hover:underline ${isActive('/AddCar')}`} to='/AddCar'>
                  Add Car
                </Link>
              </li>
              <li>
                <Link className={`hover:underline ${isActive('/MyCars')}`} to='/MyCars'>
                  My Cars
                </Link>
              </li>
              <li>
                <Link className={`hover:underline ${isActive('/MyBookings')}`} to='/MyBookings'>
                  My Bookings
                </Link>
              </li>
              <div className='flex items-center gap-2'>
                {user.photoURL && (
                  <img src={user.photoURL} alt='avatar' className='w-8 h-8 rounded-full hidden md:block' />
                )}
                <button className='btn btn-warning' onClick={logOut}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <li>
                <Link className={`hover:underline ${isActive('/Login')}`} to='/Login'>
                  Login
                </Link>
              </li>
              <li>
                <Link className={`hover:underline ${isActive('/SignUp')}`} to='/SignUp'>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Header


