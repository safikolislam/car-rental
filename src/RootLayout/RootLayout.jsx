import { Outlet } from "react-router";
import Header from "../Components/Header";
import Footer from "../Components/Footer";



const RootLayout = () => {
    return (
        <div>
          
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;