import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Alert from "../AlertAndHelper/Alert";
import Navbar from "../HeaderAndFooter/Navbar";
import { useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const [changePassword, setChangePassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const formRef = useRef();
  const [profileData, setProfileData] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const closeDialog = () => setIsVisible(false);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/changePassword/createNewPassword`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      console.log(response);
      setErrorFlag(true);
      setErrorMessage(response.data.message);
      setLoader(false);
      
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message );
      setLoader(false);
      
    }
  };

  // Delete the Account
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    setLoader(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/v1/auth/deleteAccount`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      console.log(response);
      setErrorFlag(true);
      setErrorMessage(response.data.message);
      setLoader(false);
      navigate("/login");
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setLoader(false);
    }
  };

  // Profile data Loaded
  useEffect(() => {
    const fetchProfileData = async () => {
     setLoader(true)
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/v1/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setProfileData(response.data.obj);
        setLoader(false);
      } catch (error) {
        setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(
          "Error fetching products:",
          error.response?.data?.message
        );
        setLoader(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loader) {
    return <Loader/>
  }

  return (
    <>
      <Navbar />
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
      <section className="min-h-screen flex items-center justify-center py-12">
        <div className="w-[1100px] h-[700px]">
          <div className="bg-gray-600/40 rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex h-full flex-col md:flex-row">
              <div className=" md:w-1/3 text-white text-center p-16 flex flex-col items-center justify-center rounded-l-3xl">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="Avatar"
                  className="w-52 h-52 rounded-full mb-8 border-4 border-white shadow-lg"
                />
                <h5 className="text-2xl font-bold">{profileData.name}</h5>
                <p className="text-xl">{profileData.role}</p>
              </div>
              <div className="md:w-2/3 p-16">
                <h6 className="text-4xl text-blue-600 font-bold">
                  Information
                </h6>
                <hr className="my-6 border-gray-300" />
                <div className="flex flex-col sm:flex-row justify-between text-2xl">
                  <div>
                    <h6 className="text-gray-100 font-semibold">Email</h6>
                    <p className="text-gray-300">{profileData.email}</p>
                  </div>
                  <div>
                    <h6 className="text-gray-100 font-semibold">Phone</h6>
                    <p className="text-gray-300">{profileData.number}</p>
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col  justify-center mt-5 space-x-3">
                  <div
                    className={`${
                      changePassword
                        ? "hidden"
                        : "visible flex flex-col w-1/2 sm:w-4/12 space-y-5 mt-12"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setChangePassword(true)}
                      className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    >
                      {changePassword ? "Submit" : "Change Password"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsVisible(true)}
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      Delete Account
                    </button>
                  </div>

                  {/* Changing Password Form */}
                  <form
                    className={`max-w-lg text-xl mx-auto my-[0.5%] ${
                      changePassword ? "visible" : "hidden"
                    }`}
                    onSubmit={handleSubmit}
                    ref={formRef}
                  >
                    {[
                      {
                        id: "oldPassword",
                        type: "password",
                        label: "Old Password",
                      },
                      {
                        id: "newPassword",
                        type: "password",
                        label: "New Password",
                      },
                      {
                        id: "confirmPassword",
                        type: "password",
                        label: "Confirm Password",
                      },
                    ].map((field) => (
                      <div
                        className="relative z-0 w-full mb-5 group"
                        key={field.id}
                      >
                        <input
                          type={field.type}
                          id={field.id}
                          onChange={handleChange}
                          name={field.id}
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setChangePassword(false);
                        }}
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* This is Pop Box for Delete an item */}
     {isVisible && (
        <div className="z-20 top-0 left-0 flex justify-center bg-black/60 items-center h-screen w-screen fixed">
          <div className=" bg-gray-700 border-8 border-t-red-600 border-gray-700">
            <section className=" p-6">
              <div className="flex gap-4 justify-center items-center">
                <svg
                  className="  text-gray-400 w-12 h-12 dark:text-red-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h1 className=" text-2xl text-center font-bold text-white">
                  Delete Account
                </h1>
              </div>
              <p className="mt-4 text-xl text-gray-300">
                Are you sure to delete this Account Permanent?
              </p>

              <footer className="  flex justify-between items-center mt-6">
                <button
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() => {
                   handleDelete()
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

export default Profile;
