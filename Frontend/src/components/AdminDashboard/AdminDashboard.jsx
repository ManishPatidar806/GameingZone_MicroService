import React, { useEffect, useState } from "react";
import Navbar from "../HeaderAndFooter/Navbar";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";

const AdminAllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const closeDialog = () => setIsVisible(false);
  const [name, setName] = useState("");
    const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/v1/product/getAllProducts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status) {
          setProducts(response.data.productList);
        }
        setLoading(false);
      } catch (error) {
        setSuccess(false);
        setErrorFlag(true);
        setErrorMessage(error.response?.data?.message || "An error occurred.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refresh]);
  const handleDelete = async (name) => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/v1/product/removeProduct?name=${name}`,
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
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message );
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      {errorFlag && errorMessage && (
        <Alert
          type={success ? "success" : "danger"}
          message={errorMessage}
          visible={errorFlag}
          setVisible={setErrorFlag}
        />
      )}
      <div className="flex justify-between container mx-auto p-6 m-3 bg-gray-900 rounded-3xl">
        <h2 className="text-3xl text-center font-bold text-blue-500 ">
          Products
        </h2>
        <button
          onClick={() => navigate("/addProduct")}
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
        >
          Add new Product
        </button>
      </div>
      <div className="container mx-auto p-6 bg-gray-900 rounded-3xl  text-white min-h-screen">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex sm:flex-row flex-col items-center bg-slate-950 p-4 rounded-xl shadow-md"
              >
                <img
                  src={product.main_Image}
                  alt={product.name}
                  className="w-28 h-32 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <p className="text-sm text-pink-400 font-semibold">
                    {product.company}
                  </p>
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-400">{product.description}</p>
                  <p className="text-green-400">
                    ₹{product.price}{" "}
                    <span className="line-through text-gray-500">₹{product.largePrice}</span>
                  </p>
                  <p className="text-red-400">{product.discount}</p>
                </div>
                <div className="flex sm:flex-col gap-3">
                  <button
                    onClick={() =>
                      navigate("/updateProduct", { state: products[index] })
                    }
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setName(product.name);
                      setIsVisible(true);
                    }}
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* This is Pop Box for Delete an item */}
      {isVisible && (
        <div className="z-20 top-0 left-0 flex justify-center bg-black/60 items-center h-screen w-screen fixed">
          <div className=" bg-gray-700 border-8 border-t-red-600 border-gray-700">
            <section className=" p-6">
              <div className="flex gap-4 justify-center items-center">
                <svg
                  class="  text-gray-400 w-12 h-12 dark:text-red-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h1 className=" text-2xl text-center font-bold text-white">
                  Delete Account
                </h1>
              </div>
              <p className="mt-4 text-xl text-gray-300">
                Are you sure to delete this Product permanent?
              </p>

              <footer className="  flex justify-between items-center mt-6">
                <button
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() => {
                    handleDelete(name);
                    closeDialog();
                  }}
                >
                  Yes
                </button>
                <button
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={closeDialog}
                >
                  No
                </button>
              </footer>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAllProduct;
