import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";
import BackgroundImage from "../../resources/BackgroundImage/BACKGROUND.jpg";

const Signup = () => {
 const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [selectrole, Setselectrole] = useState("USER");
  const [loader, setLoader] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRole = (e) => {
    Setselectrole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    if (formData.phone && formData.phone.length !== 10) {
      hasError = true;
      setError("Mobile number is Invalid");
      console.log("number clicked");
    } else if (formData.password !== formData.confirmpassword) {
      hasError = true;
      setError("Password must be same");
    }
    setFlag(hasError);
    if (
      formData.phone &&
      formData.phone.length === 10 &&
      formData.password === formData.confirmpassword
    ) {
      Calling();
    }
  };

  const Calling = async () => {
  
    try {
      setLoader(true);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/auth/signup?role=${selectrole}`,
        formData
      );
      if (response.data.status) {
        let token = response.data.token.substring(7);
        localStorage.setItem("token", token);
        navigate("/");
      }
      setLoader(false);
    } catch (error) {
      setError(error.response?.data.message);
      setFlag(true);
      setLoader(false);
    }
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="bg-center min-h-screen w-screen bg-repeat bg-gray-500 bg-blend-multiply" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className="flex flex-col items-center justify-center px-6  mx-auto p-10 ">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-transparent dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your account
            </h1>
            <form className="space-y-3 md:space-y-3" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Manish Patidar"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="phone"
                  onChange={handleChange}
                  id="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-number-spin-box]:appearance-none  "
                  placeholder="6266209758"
                  required
                />
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleRole}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  placeholder="*************"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  onChange={handleChange}
                  placeholder="*************"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            
              {flag && error ? (
                <div className="text-red-600">{error}</div>
              ) : (
                <div></div>
              )}

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                already have an account yet?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-blue-700"
                >
                  Login 
                </Link>
              </p>
            </form>

            {/* <div
              id="third-party-auth"
              className="flex items-center justify-center mt-5 flex-wrap"
            >
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                <img
                  className="max-w-[25px]"
                  src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                  alt="Google"
                />
              </button>
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                <img
                  className="max-w-[25px]"
                  src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/"
                  alt="Linkedin"
                />
              </button>
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                <img
                  className="max-w-[25px] filter dark:invert"
                  src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                  alt="Github"
                />
              </button>
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                <img
                  className="max-w-[25px]"
                  src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                  alt="Facebook"
                />
              </button>
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                <img
                  className="max-w-[25px] dark:gray-100"
                  src="https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/"
                  alt="Twitter"
                />
              </button>
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                <img
                  className="max-w-[25px]"
                  src="https://ucarecdn.com/3277d952-8e21-4aad-a2b7-d484dad531fb/"
                  alt="Apple"
                />
              </button>
            </div> */}

            <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm">
              <p className="cursor-default">
                By signing in, you agree to our{" "}
                <Link
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                  to="#"
                >
                  <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Terms
                  </span>
                </Link>{" "}
                and{" "}
                <Link
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                  to="#"
                >
                  <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Privacy Policy
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
