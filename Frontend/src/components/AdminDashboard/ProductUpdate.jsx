import { useState } from "react";
import axios from "axios";
import Alert from "../AlertAndHelper/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";

const ProductUpdate = () => {
  const location = useLocation();
  const product = location.state;
  const [formData, setFormData] = useState({
    name: product?.name,
    price: "",
    largePrice: "",
    typeOfProduct: "",
    description: "",
    processer: "",
    graphicCard: "",
    ram: "",
    memory: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, SetSuccess] = useState(true);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setFormData;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    console.log(formData);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/product/updateProduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      SetSuccess(true);
      setErrorFlag(true);
      setErrorMessage(response.data.message);
      setLoader(false);
    } catch (error) {
      SetSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response.data.message);
      setLoader(false);
    }
  };

  const renderDropdown = (id, label, options) => (
    <div className="relative z-0 w-full mb-5 group" key={id}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        id={id}
        name={id}
        onChange={handleChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-2.5"
        required
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      {errorFlag && errorMessage ? (
        <Alert
          type={success ? "success" : "danger"}
          message={errorMessage}
          visible={errorFlag}
          setVisible={setErrorFlag}
        />
      ) : (
        ""
      )}
      <h2 className="text-blue-500 text-center text-2xl mt-11 ">
        GAME UPDATED FORM
      </h2>
      <div className="max-w-lg text-center mx-auto my-[2%]">
        <label className="text-white text-2xl">{product?.name}</label>
      </div>

      <form className="max-w-lg mx-auto my-[2%] " onSubmit={handleSubmit}>
        {[
          { id: "largePrice", type: "number", label: "Price" },
          { id: "price", type: "number", label: "Original price" },
        ].map((field) => (
          <div className="relative z-0 w-full mb-5 group" key={field.id}>
            <input
              type={field.type}
              id={field.id}
              onChange={handleChange}
              name={field.id}
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer 
                 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-number-spin-box]:appearance-none"
                  
              `}
              placeholder=" "
              required
            />

            <label
              htmlFor={field.id}
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {field.label}
            </label>
          </div>
        ))}
        {renderDropdown("typeOfProduct", "Product Category", [
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
        ])}
        <div>
          <textarea
            id="message"
            rows="4"
            required
            onChange={handleChange}
            name="description"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description of Game"
          ></textarea>
        </div>

        <h2 className="text-blue-500 text-center text-xl m-4">
          System Requiremets
        </h2>

        <div className="grid grid-cols-2 gap-x-5">
          {renderDropdown("processer", "Processer", [
            "Intel i3 11500H ",
            "Intel i5  12450H",
            "Intel i7 13250H",
            "Intel i9 14900HX",
            "AMD Ryzen 3 7000Hx",
            "AMD Ryzen 5  4000HS",
            "AMD Ryzen 7 8000HS",
            "AMD Ryzen 9 9000HS",
          ])}

          {renderDropdown("graphicCard", "Graphic Card", [
            "NVIDIA GTX 1050",
            "NVIDIA GTX 1650",
            "NVIDIA RTX 2060",
            "NVIDIA RTX 3060",
            "NVIDIA RTX 4090",
            "AMD Radeon RX 570",
            "AMD Radeon RX 6700",
          ])}

          {renderDropdown("ram", "RAM", ["4GB", "8GB", "16GB", "32GB", "64GB"])}

          {renderDropdown("memory", "Memory (Storage)", [
            "20GB SSD",
            "40GB SSD",
            "60GB SSD",
            "80GB SSD",
            "100GB SSD",
            "120GB SSD",
            "140GB SSD",
            "200GB SSD",
          ])}
        </div>
        <div className="flex w-full gap-x-1 items-center justify-center">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Submit
          </button>

          <button
            onClick={() => navigate(-1)}
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductUpdate;
