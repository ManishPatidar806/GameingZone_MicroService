import React, { useEffect, useState } from "react";
import Navbar from "../HeaderAndFooter/Navbar";
import axios from "axios";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";

const PurchaseProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);

  // setRefresh(!refresh)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/v1/order/getOrderList`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status) {
          setProducts(response.data.obj);
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
      <div className=" container mx-auto p-6 m-3 bg-gray-900 rounded-3xl">
        <h2 className="text-3xl text-center font-bold text-blue-500 ">
          Purchased Items
        </h2>
      </div>

      <div className="container mx-auto p-6 bg-gray-900 rounded-3xl  text-white min-h-screen">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {products?.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center bg-slate-950 p-4 rounded-xl shadow-md"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <p className="text-sm text-pink-400 font-semibold">{product.company}</p>
                  <h3 className="text-lg font-bold">{product.name}</h3>
                
                  <p className="text-gray-400">
                    ₹{product.price}{" "}
                    <span className="line-through text-gray-600">₹{product.largePrice}</span>
                  </p>
                  <p className="text-gray-500">{product.date}</p>
                  
                </div>
                <p className="text-green-500">Purchased</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseProduct;
