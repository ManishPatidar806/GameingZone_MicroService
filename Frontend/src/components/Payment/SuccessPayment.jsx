import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";

const SuccessPayment = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdFromURL = urlParams.get("session_id");

    console.log(sessionIdFromURL);

    if (sessionIdFromURL) {
      fetchOrderDetails(sessionIdFromURL); // Fetch order details from backend
    }
    setLoading(false);
  }, []);

  const fetchOrderDetails = async (sessionId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/v1/payment/detail/session?sessionId=${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log(data.productPaymentRequestList);

      setProduct(data.productPaymentRequestList);
      console.log(product);

      const uploadOrderRequest = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/order/addOrderList`,
        data.productPaymentRequestList,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const removeAllProductFromCart = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/v1/cartItem/removeAllCart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
    } catch (error) {
      // console.error(
      //   "Error fetching order details:",
      //   error.uploadOrderRequest?.message
      // );
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-50 h-screen w-screen flex justify-center items-center ">
      {errorFlag && errorMessage && (
        <Alert
          type={success ? "success" : "danger"}
          message={errorMessage}
          visible={errorFlag}
          setVisible={setErrorFlag}
        />
      )}
      <div className="bg-white shadow-lg p-6 md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p>Have a great day!</p>
          <div
            className="py-10 text-center"
            onClick={() => navigate("/orderHistory")}
          >
            <a className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
              GO BACK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
