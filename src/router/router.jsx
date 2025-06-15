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
import axios from "axios"
export const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        children:[
            {
                path:'/',
                loader:()=>axios(`${import.meta.env.VITE_API_URL}/cars`),
                Component:Home,
            },
            {
                path:"AvailableCar",
                Component:AvailableCar
            },
            {
                path:'SignUp',
                Component:SignUp,
            },
            {
                path:'Login',
                Component:Login,
            },
            {
                path:'AddCar',
                Component:AddCar,
            },
            {
             path:'MyCars',
             Component:MyCars
            },
            {
                path:'MyBookings',
                Component:MyBookings
            },
          
        ]
    }
])