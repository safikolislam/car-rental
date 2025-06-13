import { Outlet } from "react-router";
import Header from "../Components/Header";



const RootLayout = () => {
    return (
        <div>
          
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;