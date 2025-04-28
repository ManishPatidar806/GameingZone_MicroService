import React, { useState } from "react";
import Navbar from "../HeaderAndFooter/Navbar";
import axios from "axios";
import Footer from "../HeaderAndFooter/Footer";
import { data, useLocation } from "react-router-dom";
import Review from "./Review";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state;
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const [visible, setVisible] = useState(false);
  const [productStatus, SetProductStatus] = useState(true);
  const data = {
    productPaymentRequestList: [],
  };
  const mainImages = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
    product.image5,
  ];
  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
    product.image5,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Add Product to Cart

  const addProductCart = async (product) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/cartItem/addToCart`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      if (response.data.status) {
        SetProductStatus(false);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.message === "Product is already in Cart") {
          SetProductStatus(false);
        }
        setSuccess(false);
        setErrorFlag(true);
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  // Remove Product From Cart

  const removeProductCart = async (name) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_API_URL
        }/v1/cartItem/removeToCart?productName=${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        SetProductStatus(true);
      }
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data.message);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handlePayment = async (name, price, id) => {
    setLoader(true);
    {
      data.productPaymentRequestList.push({
        productId: id,
        name: name,
        amount: price,
      });
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/payment/v2/stripe`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);

      if (response.data.status) {
        window.location.href = response.data.url;
      }
      setLoader(false);
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response.data.message);
      setLoader(false);
    }
  };

  const headingstyle = {
    background: "linear-gradient(15deg, #006aff, #8a0dff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="w-screen h-screen">
      <Navbar />
      {errorFlag && errorMessage && (
        <Alert
          type={success ? "success" : "danger"}
          message={errorMessage}
          visible={errorFlag}
          setVisible={setErrorFlag}
        />
      )}
      <p className="text-6xl mt-[5%] text-center" style={headingstyle}>
        {product?.name}
      </p>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 my-10 mx-5 md:mx-10 lg:mx-16 xl:mx-32   justify-center">
        <div className="flex  justify-center items-center h-72 overflow-hidden">
          <div className="flex">
            <div
              id="gallery"
              className="relative flex  pb-4"
              data-carousel="slide"
            >
              {/* Carousel wrapper */}
              <div className="relative w-[560px] h-72   overflow-hidden rounded-lg ">
                {mainImages?.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute  w-full h-full duration-700 ease-in-out ${
                      index === currentIndex ? "block" : "hidden"
                    }`}
                    data-carousel-item
                  >
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full "
                    />
                  </div>
                ))}
              </div>

              {/* Slider controls */}
              <button
                type="button"
                className=" absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={prevSlide}
                data-carousel-prev
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-4 h-4 text-white dark:text-white rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>

              <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={nextSlide}
                data-carousel-next
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-4 h-4 text-white dark:text-white rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>
          </div>
          <div className="  grid grid-rows-5 h-full ml-4 overflow-scroll gap-4">
            {images?.map((i, index) => (
              <div key={index}>
                <img className="h-auto w-36 rounded-lg" src={i} alt="Image 1" />
              </div>
            ))}
          </div>
        </div>

        <div className=" m-1 md :m-10  text-white flex-col justify-center items-center ">
          <br></br>
          <p className="mx-5 my-2 w-full text-gray-400 ">
            {product.description}
          </p>
          <p className="mx-5 my-2 text-green-300">Price:₹{product.price}</p>
          <p className="mx-5 my-2 text-gray-300">Total Download:100M+</p>
          <p className="mx-5 my-2 text-pink-400">
            Publisher : {product.company}
          </p>
          <p className="mx-5 my-2 text-indigo-300">
            Release Date:{product.localDate}
          </p>

          {(localStorage.getItem("role") === "USER" ||
            !localStorage.getItem("role")) && (
            <>
              <button
                type="button"
                onClick={() => {
                  if (!localStorage.getItem("role")) {
                    window.location.href = "/login";
                  }
                  productStatus
                    ? () => addProductCart(product)
                    : () => removeProductCart(product.name);
                }}
                className={`w-[90%] my-1 md:w-full mx-5 ${
                  productStatus
                    ? "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    : "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                }`}
              >
                {productStatus ? "Add to cart" : "Remove From Cart"}
              </button>
              <button
                onClick={() => {
                  if (!localStorage.getItem("role")) {
                    window.location.href = "/login";
                  }

                  handlePayment(product.name, product.price, product.id);
                }}
                type="button"
                className="w-[90%] my-1 mx-5 md:w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Buy Now
              </button>
            </>
          )}
        </div>
      </div>

      <div className="container flex justify-center rounded-lg max-w-2xl p-4 mx-auto text-white bg-gray-900/90">
        <p className="text-center text-5xl mx-10">System Requirement </p>
        <button
          onClick={() => {
            setVisible(!visible);
          }}
          className="  rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${visible ? "chevron-up" : "chevron-down"}`}
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
      </div>
      <div
        className={`${
          visible ? "visible" : "hidden"
        } container flex justify-center rounded-lg max-w-2xl p-4 mx-auto text-gray-300 bg-gray-900/90 text-2xl m-5`}
      >
        <table>
          <tbody>
            <tr className="px-5">
              <td>Operating System :</td>
              <td>Window 11</td>
            </tr>
            <tr className="m-2">
              <td>Processer : </td>
              <td>{product.processer} or above </td>
            </tr>
            <tr className="m-2">
              <td>Graphic Card : </td>
              <td>{product.graphic_card} or above </td>
            </tr>
            <tr className="m-2">
              <td>Architecture:</td>
              <td>64 bits</td>
            </tr>
            <tr className="m-2">
              <td>Space:</td>
              <td>{product.memory}</td>
            </tr>
            <tr className="m-2">
              <td>Memory </td>
              <td>{product.ram} or above</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Review Section */}
      <Review productId={product.id} adminEmail={product.adminEmail} />
      <Footer />
    </div>
  );
};
export default ProductDetails;
