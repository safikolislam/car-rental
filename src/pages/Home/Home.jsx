import { useLoaderData } from "react-router";
import Hero from "../../Components/Hero";
import MainPart from "../../Components/MainPart";

import CarCard from "../../Components/carCard";




const Home = () => {
    const data = useLoaderData()
    const cars= data?.data || [];
   console.log(data.data);
    return (
        <div>
        <title>Home | Rentify Car</title>
        <Hero></Hero>
        <MainPart></MainPart>
        <h2 className="font-semibold text-2xl text-center mt-5">Recent Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-12">
         {
            cars.map(car=><CarCard key={car._id } car={car}></CarCard>)
         }
        </div>
        </div>
    );
};

export default Home;