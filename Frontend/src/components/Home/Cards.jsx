import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/MainLoader";
import Alert from "../AlertAndHelper/Alert";

const Cards = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(false); // Loading state
  const [originalProducts, setOriginalProducts] = useState([]); // State to store original products
  const [cartStatus, setCartStatus] = useState({}); // State to store cart status for each product
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);

  // All Product show in list
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/v1/product/allProducts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setProducts(response.data.productList);
        setOriginalProducts(response.data.productList);
        setLoading(false);
      } catch (error) {
        setSuccess(false);
        setErrorFlag(true);
        setErrorMessage(error.response?.data?.message || "An error occurred.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

      if (response.data.status) {
        setCartStatus((prevStatus) => ({
          ...prevStatus,
          [product.name]: true,
        }));
      }
    } catch (error) {
      if (error.response.data.message === "Product is already in Cart") {
        setCartStatus((prevStatus) => ({
          ...prevStatus,
          [product.name]: true,
        }));
      }
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  // Remove Product from Cart
  const removeProductCart = async (name) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/v1/cartItem/removeToCart?productName=${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        setCartStatus((prevStatus) => ({
          ...prevStatus,
          [name]: false,
        }));
      }
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
      setLoading(false);
    }
  };

  const category = [
    "All Products",
    "Action",
    "Adventure",
    "Racing",
    "Sports",
    "Simulation",
    "Puzzle",
    "Strategy",
    "Card and Casino",
    "Board",
    "Fighting",
    "MOBA",
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {errorFlag && errorMessage && (
        <Alert
          type={success ? "success" : "danger"}
          message={errorMessage}
          visible={errorFlag}
          setVisible={setErrorFlag}
        />
      )}
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        {category.map((cat, index) => (
          <button
            key={index}
            onClick={() => {
              if (cat === "All Products") {
                setProducts(originalProducts);
              } else {
                const filteredProducts = originalProducts.filter(
                  (product) => product.typeOfProduct === cat
                );
                setProducts(filteredProducts);
              }
            }}
            className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-5 mb-5 mx-10 justify-evenly gap-5">
        {products.map((product, index) => (
          <div
            
            key={index}
            className="hover:scale-105 duration-700 ease-in-out max-h-sm max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-800"
          >
            <img
              className="rounded-t-lg"
              onClick={() => navigate("/productdetails", { state: product })}
              src={`${product.main_Image}`}
              alt=""
            />

            <div className="p-5">
              <div  onClick={() => navigate("/productdetails", { state: product })}>
              <h5 className=" text-2xl font-bold tracking-tight text-white">
                {product.name}
              </h5>
              <p className="mb-3 text-pink-400">{product.company}</p>
              <p className="mb-3 text-gray-500">
                {product.name}is a best {product.typeOfProduct} Game. It is
                Publish by {product.company} on {product.localDate}{" "}
              </p>
              <p className="text-green-400 mb-3">
                ₹{product.price}{" "}
                <span className="line-through text-green-600">
                  {product.largePrice}
                </span>
              </p>
              </div>
              {localStorage.getItem("role") === "USER" && (
                <button
                  type="button"
                  onClick={
                    cartStatus[product.name]
                      ? () => removeProductCart(product.name)
                      : () => addProductCart(product)
                  }
                  className={`inline-flex w-full justify-center items-center px-3 py-2 text-sm ${
                    cartStatus[product.name]
                      ? "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      : "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  }`}
                >
                  {cartStatus[product.name]
                    ? "Remove From Cart"
                    : "Add to cart"}
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
