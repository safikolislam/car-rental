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
import ErrorPage from "../pages/ErrorPage/ErrorPage"
import CarDetails from "../pages/CarDetails/CarDetails"
import PrivateRoute from "../Components/privateRoute"
import Loading from "../Components/Loading"



export const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                loader:()=>axios(`${import.meta.env.VITE_API_URL}/cars`),
                hydrateFallbackElement:<Loading></Loading>,
                Component:Home,
            },
            {
                path:"AvailableCar",
                  loader:()=>axios(`${import.meta.env.VITE_API_URL}/cars`),
                  hydrateFallbackElement:<Loading></Loading>,
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
                element:<PrivateRoute><AddCar></AddCar></PrivateRoute>
            },
            {
             path:'MyCars',
              loader:()=>axios(`${import.meta.env.VITE_API_URL}/cars`),
              hydrateFallbackElement:<Loading></Loading>,
             element:<PrivateRoute><MyCars></MyCars></PrivateRoute>
            },
            {
                path:"/CarDetails/:id",
                 loader:({params})=>axios(`${import.meta.env.VITE_API_URL}/cars/${params.id}`),
                Component:CarDetails,
                

            },
            {
                path:'MyBookings',
                  loader:()=>axios(`${import.meta.env.VITE_API_URL}/cars`),
                  hydrateFallbackElement:<Loading></Loading>,
                element:<PrivateRoute><MyBookings></MyBookings></PrivateRoute>
            },
          
        ]
    }
])