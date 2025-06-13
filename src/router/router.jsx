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
export const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        children:[
            {
                path:'/',
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