import React, { useEffect, useState } from "react";
import { HeroVideos } from "../../resources/Assets";
import axios from "axios";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";



const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
    const fetchProfileData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/v1/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        localStorage.setItem("name", response.data.obj.name);
        localStorage.setItem("role", response.data.obj.role);
        localStorage.setItem("email", response.data.obj.email);
        setLoading(false);
      } catch (error) {
        setSuccess(false);
        setErrorFlag(true);
        setErrorMessage(error.response?.data?.message || "An error occurred.");
        setLoading(false);
      }
    };

    fetchProfileData();
    }
  }, [])
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % HeroVideos.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + HeroVideos.length) % HeroVideos.length
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {errorFlag && errorMessage && (
        <Alert
          type={success ? "success" : "danger"}
          message={errorMessage}
          visible={errorFlag}
          setVisible={setErrorFlag}
        />
      )}
      {HeroVideos.map((slide, index) => (
        <div key={index}>
          <video
            autoPlay
            muted
            loop
            className={`absolute w-full h-full object-cover ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            } `}
          >
            <source src={HeroVideos[index]} type="video/mp4" />
          </video>
        </div>
      ))}

     
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 text-black p-3 rounded-full focus:outline-none hover:bg-white/50"
      >
        &#8249;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 text-black p-3 rounded-full focus:outline-none hover:bg-white/50"
      >
        &#8250;
      </button>
    </div>
  );
};
export default HeroSection;
