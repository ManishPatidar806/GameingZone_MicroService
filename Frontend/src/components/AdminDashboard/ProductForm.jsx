import { useState } from "react";
import axios from "axios";
import Alert from "../AlertAndHelper/Alert";
import { useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const token = localStorage.getItem("token");

    const uploadData = new FormData();
    Object.keys(formData).forEach((key) => {
      uploadData.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/product/uploadProduct`,
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess(true);
      setErrorFlag(true);
      setErrorMessage(response.data.message);
      setLoader(false);
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
      setLoader(false);
    }
  };

  const renderTextFields = (fields) => {
    return fields.map(({ id, type, label }) => (
      <div className="relative z-0 w-full mb-5 group" key={id}>
        <input
          type={type}
          id={id}
          name={id}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-number-spin-box]:appearance-none"
                  
          placeholder=" "
          required
        />
        <label
          htmlFor={id}
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {label}
        </label>
      </div>
    ));
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
      {errorFlag && errorMessage && (
        <Alert
          type={success ? "success" : "danger"}
          message={errorMessage}
          visible={errorFlag}
          setVisible={setErrorFlag}
        />
      )}

      <form className="max-w-lg mx-auto my-[2%]  " onSubmit={handleSubmit}>
        <h2 className="text-blue-500 text-center text-2xl m-10">
          GAME UPLOAD FORM
        </h2>
        {renderTextFields([
          { id: "name", type: "text", label: "Name of Game" },
          { id: "company", type: "text", label: "Company Name" },
          { id: "largePrice", type: "number", label: "Price" },
          { id: "price", type: "number", label: "Original price" },
        ])}

        {renderDropdown("typeOfProduct", "Product Category", [
          "Action",
          "Adventure",
          "Racing",
          "Sports",
          "Simulation",
          "Survival",
          "Horror",
          "Superhero",
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
            name="description"
            onChange={handleChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description of Game"
          ></textarea>
        </div>

        <h2 className="text-blue-500 text-center text-xl m-4">Image Section</h2>
        <div className="grid grid-cols-2 gap-x-5">
          {["mainImage", "image1", "image2", "image3", "image4", "image5"].map(
            (id) => (
              <div className="relative z-0  w-full mb-5 group" key={id}>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload {id.replace("image", "Image ")}
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id={id}
                  name={id}
                  onChange={handleChange}
                  type="file"
                />
              </div>
            )
          )}
        </div>
        <h2 className="text-blue-500 text-center text-xl m-4">
          System Requirements
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
        <div className="flex gap-1 w-full items-center justify-center">
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

export default ProductForm;
