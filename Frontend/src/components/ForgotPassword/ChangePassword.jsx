import axios from "axios";
import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";


const ChangePassword = () => {
  const [selectrole, Setselectrole] = useState("USER");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const email = location.state;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleRole = (e) => {
    Setselectrole(e.target.value);
  };
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/forgotPassword/passwordChange?password=${formData.password}&email=${email}&role=${selectrole}`
      );

      setLoader(false);
      if (response.data.status) {
        setIsVisible(true);
      }
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
      setLoader(false);
    }
    setError("");
  };
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <section className="bg-gray-900 flex items-center justify-center min-h-screen px-6 py-8">
        {errorFlag && errorMessage && (
          <Alert
            type={success ? "success" : "danger"}
            message={errorMessage}
            visible={errorFlag}
            setVisible={setErrorFlag}
          />
        )}
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-white">
          {/* Logo & Title */}

          <h2 className="text-2xl text-blue-600  font-bold text-center mb-4">
            Change Password
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <label className="  text-white text-xl w-full  ">{email}</label>
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="role"
              >
                Select your Role
              </label>

              <select
                name="role"
                onChange={handleRole}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="user">USER</option>
                <option value="admin">ADMIN</option>
              </select>
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="bg-gray-700 border border-gray-600 text-white rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Reset Password
            </button>
          </form>
        </div>
      </section>
      {isVisible && (
        <div className="z-20 top-0 left-0 flex justify-center bg-black/60 items-center h-screen w-screen fixed">
          <div className=" bg-gray-700 border-8 border-t-green-600 border-gray-700">
            <section className=" p-6">
              <div className="flex gap-4 justify-center items-center">
                <svg
                  viewBox="0 0 24 24"
                  className="text-green-500 w-12 h-12  my-0"
                >
                  <path
                    fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                  ></path>
                </svg>
                <h1 className=" text-2xl text-center font-bold text-white">
                  Congratulations!
                </h1>
              </div>
              <p className="mt-4 text-xl text-gray-300">
                Your Password Change Successfully.
              </p>

              <footer className="  flex justify-center items-center mt-6">
                <button
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Ok
                </button>
              </footer>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
