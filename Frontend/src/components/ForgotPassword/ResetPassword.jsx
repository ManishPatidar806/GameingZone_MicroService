import axios from "axios";
import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";



export default function ResetPassword() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const location = useLocation();
  const email = location.state;
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if filled
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setLoader(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/forgotPassword/verifyOtp?email=${email}&otp=${otp.join(
          ""
        )}`
      );
      setSuccess(true);
      setErrorFlag(true);
      setErrorMessage(response.data.message);
      setLoader(false);
      if (response.data.status) {
        navigate("/changePassword", { state: email });
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {errorFlag && errorMessage && (
        <Alert
          type={success ? "success" : "danger"}
          message={errorMessage}
          visible={errorFlag}
          setVisible={setErrorFlag}
        />
      )}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-semibold">Reset your password</h2>
        <p className="text-gray-400 text-sm mt-2">
          Enter the 6-digit code sent to your email. This code is valid for the
          next 5 minutes.
        </p>
        <p className="text-white my-3">{email}</p>
        <div className="flex justify-center gap-2 mt-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-12 h-12 text-center text-lg font-semibold bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center"
        >
          🔒 Reset password
        </button>

        <div className="mt-4 text-sm">
          <p className="text-gray-400">
            Didn't get the code?{" "}
            <button className="text-blue-400 hover:underline" onClick={()=>navigate(-1)}>
              Try again.
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
