import {
    createBrowserRouter,
} from "react-router" 
import RootLayout from "../RootLayout/RootLayout"
import Home from "../pages/Home/Home"
import AvailableCar from "../pages/AvailableCars/AvailableCars"
import SignUp from "../pages/SignUp/SignUp"
import Login from "../pages/Login/Login"
import AddCar from "../pages/AddCar/AddCar"
import MyBookings from "../pages/MyBookings/MyBookings"
import MyCars from "../pages/MyCars/MyCars"

import ErrorPage from "../pages/ErrorPage/ErrorPage"
import CarDetails from "../pages/CarDetails/CarDetails"
import PrivateRoute from "../Components/privateRoute"


export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                
                element: <Home></Home>
            },
            {
                path: "AvailableCar",
             
                element: <AvailableCar></AvailableCar>
            },
            {
                path: 'SignUp',
                Component: SignUp,
            },
            {
                path: 'Login',
                Component: Login,
            },
            {
                path: 'AddCar',
                element: <PrivateRoute><AddCar></AddCar></PrivateRoute>
            },
            {
                path: 'MyCars',
            
                element: <PrivateRoute><MyCars></MyCars></PrivateRoute>
            },
            {
               
                path: "/CarDetails/:carId",
                
                element: <CarDetails></CarDetails>


            },
            {
                path: 'MyBookings',
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>,
            
                
            },

        ]
    }
])
