import React, { useEffect, useState } from "react";
import Navbar from "../HeaderAndFooter/Navbar";
import Footer from "../HeaderAndFooter/Footer";
import axios from "axios";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";

const WishList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removeStatus, setRemoveStatus] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const navigate = useNavigate();
  const data = {
    productPaymentRequestList: [],
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
        setRemoveStatus(true);
        setRefresh(!refresh);
      }
      setSuccess(true);
      setErrorFlag(true);
      setErrorMessage(response.data.message);
    } catch (error) {
      
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/v1/cartItem/allCartItem`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status) {
          setUsers(response.data.list);
        }
        setLoading(false);
      } catch (error) {
       
        setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refresh]);

  const handlePurchase = async () => {
    const token = localStorage.getItem("token");
    setLoading(true)
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
      setLoading(false)
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data.message);
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
      <div className="container flex justify-center items-center mx-auto m-3 p-4 bg-gray-900 rounded-3xl">
        <h2 className="text-3xl text-center font-bold text-blue-500 ">
          Checkout
        </h2>
      </div>
      <div className="container mx-auto p-6 bg-gray-900 rounded-3xl text-white min-h-screen">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {users.map((product) => (
              <div
                key={product.id}
                className="flex  items-center bg-slate-950 p-4 rounded-lg shadow-md"
               >
                <div className="hidden">
                  {" "}
                  {data.productPaymentRequestList.push({
                    productId: product.productId,
                    name: product.name,
                    amount: product.price,
                  })}
                </div>  
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <p className="text-sm text-pink-400 font-semibold">{product.companyName}</p>
                  <h3 className="text-lg font-bold">{product.name}</h3>
                
                  <p className="text-gray-400">
                    ₹{product.price}{" "}
                    <span className="line-through text-gray-600">{product.largePrice}</span>
                  </p>
                
                </div>
                <button
                  onClick={() => removeProductCart(product.name)}
                  className="text-red-500 border border-red-500 px-2 py-1 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/3 bg-slate-950 p-4 rounded-lg shadow-md h-64 overflow-y-auto">
            <h3 className="text-lg font-bold text-blue-500">
              PRICE DETAILS ({users.length} items)
            </h3>
            <div className="border-b border-gray-700 my-3"></div>

            <p className="flex justify-between text-gray-300">
              <span>Price</span>{" "}
              <span>₹{users.reduce((acc, p) => acc + p.price, 0)}</span>
            </p>
            <p className="flex justify-between text-gray-300">
              <span>Discount</span>{" "}
              <span className="text-green-400">
                -₹{users.reduce((acc, p) => acc + (p.price - p.price), 0)}
              </span>
            </p>
            <div className="border-b border-gray-700 my-3"></div>
            <p className="flex justify-between text-white text-lg font-bold">
              <span>Total Amount</span>{" "}
              <span>₹{users.reduce((acc, p) => acc + p.price, 0)}</span>
            </p>
            <button
              onClick={() => handlePurchase()}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
