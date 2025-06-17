import { useLoaderData } from "react-router";
import Hero from "../../Components/Hero";
import MainPart from "../../Components/MainPart";

import CarCard from "../../Components/carCard";

import Offer from "../../Components/Offer";
import CustomerReviews from "../../Components/CustomerReviews";
import HowItWorks from "../../Components/HowItWorks";
import { useEffect, useState } from "react";





const Home = () => {
    const data = useLoaderData()
 const [cars,setCars] =useState([data?.data || []])
   

  useEffect(() => {
    fetch('http://localhost:3000/cars/home') 
      .then(res => res.json())
      .then(data => setCars(data));
  }, []);
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
        
        <Offer></Offer>
        <CustomerReviews></CustomerReviews>
        <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;
