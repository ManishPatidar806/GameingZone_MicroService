import { useState } from "react";
import axios from "axios";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";
import { useNavigate } from "react-router-dom";

const EmailInput = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/forgotPassword/sendOtp?email=${email}`
      );
      setSuccess(true);
      setErrorFlag(true);
      setLoader(false);
      setErrorMessage(response.data.message);
      if (response.data.status) {
        navigate('/verifyOtp' ,{state:email});
      }
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
      setLoader(false);
    }
  };

  if (loader) {
    return <Loader />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {errorFlag && errorMessage && (
        <Alert
          type={success ? "success" : "danger"}
          message={errorMessage}
          visible={errorFlag}
          setVisible={setErrorFlag}
        />
      )}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-96 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="relative w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a6 6 0 00-6 6v2H4v12h16V10h-2V8a6 6 0 00-6-6zm0 2a4 4 0 014 4v2h-8V8a4 4 0 014-4zm-6 8h12v10H6V12z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold">OTP Verification</h2>
        <p className="text-gray-400 text-sm mt-2">
          Enter your email to Generate Otp.
        </p>

        {/* Email Input */}
        <form onSubmit={handleSubmit}>
          <div className="relative mt-5">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="email"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@gmail.com"
              required
              name="email"
              onChange={handleChange}
            />
          </div>
          {/* Send Code Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            Send Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailInput;
