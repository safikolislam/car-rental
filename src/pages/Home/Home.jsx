
import Hero from "../../Components/Hero";
import MainPart from "../../Components/WhyChooseUs";



import Offer from "../../Components/Offer";
import CustomerReviews from "../../Components/CustomerReviews";
import HowItWorks from "../../Components/HowItWorks";
import FAQ from "../../Components/FAQ";






const Home = () => {

    return (
        <div>
        <title>Home | Rentify Car</title>
        <Hero></Hero>
        <MainPart></MainPart>
       
     
        
        <Offer></Offer>
        <CustomerReviews></CustomerReviews>
        <HowItWorks></HowItWorks>
        <FAQ></FAQ>
        </div>
    );
};

export default Home;
