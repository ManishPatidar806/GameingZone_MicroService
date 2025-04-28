import Cards from "./Cards";
import Footer from "../HeaderAndFooter/Footer";
import HeroSection from "./HeroSection";
import Navbar from "../HeaderAndFooter/Navbar";

const Home=()=>{
    return(
        <>
        <Navbar/>
        <HeroSection/>
        <Cards/>
        <Footer/>
        </>
    );
}

export default Home;