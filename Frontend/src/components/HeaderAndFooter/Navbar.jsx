import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const colors = [
    "bg-red-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-lime-500",
    "bg-amber-500",
    "bg-cyan-500",
    "bg-rose-500",
    "bg-fuchsia-500",
    "bg-violet-500",
    "bg-sky-500",
    "bg-emerald-500",
    "bg-amber-600",
    "bg-red-600",
    "bg-purple-600",
    "bg-indigo-600",
    "bg-green-600",
    "bg-blue-600",
    "bg-yellow-600",
    "bg-pink-600",
    "bg-teal-600",
    "bg-orange-600",
    "bg-lime-600",
    "bg-amber-600",
    "bg-cyan-600",
    "bg-rose-600",
    "bg-fuchsia-600",
    "bg-violet-600",
    "bg-sky-600",
    "bg-emerald-600",
    "bg-amber-700",
    "bg-red-700",
    "bg-purple-700",
    "bg-indigo-700",
    "bg-green-700",
    "bg-blue-700",
    "bg-yellow-700",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Toggle search input visibility
  const toggleSearch = () => {
    setIsSearchVisible((prevState) => !prevState);
  };
  return (
    <div className="flex m-5">
      {/* Button to show the drawer */}

      <div className="text-center flex w-full  justify-between">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          onClick={toggleDrawer}
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <div className="flex">
          <div className=" mx-5 relative hidden md:block md:visible ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>

          <button
            type="button"
            onClick={toggleSearch} // Toggle search visibility
            aria-controls="navbar-search"
            aria-expanded={isSearchVisible ? "true" : "false"}
            className="md:hidden  mx-5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <svg
              className="w-5 h-5"
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
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>

          {/* Conditionally render search input */}
          {isSearchVisible && (
            <div className=" md:hidden relative md:block mx-5">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          )}
        </div>
      </div>

      {/* Drawer component */}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white dark:bg-gray-900/90`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold  uppercase text-blue-500"
        >
          Gameingzone
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-1 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            
            <li>
              <div className="px-4 py-1">
                <div className="flex justify-center m-2">
                  <div
                    className={`w-12 h-12 flex items-center justify-center ${randomColor} text-white text-xl font-bold rounded-full`}
                  >
                    {localStorage.getItem("name")?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <p className="text-sm text-center text-gray-900 dark:text-white">
                  {localStorage.getItem("name")}
                </p>
                <p className="text-sm text-center font-medium text-gray-900 truncate dark:text-gray-300">
                  {localStorage.getItem("role")}
                </p>
              </div>
            </li>

            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=U5JRqX4RSgfj&format=png&color=9ca3af"
                  className="h-8 w-8 text-gray-500"
                ></img>
                <span className="ms-3">Home</span>
              </Link>
            </li>

            {localStorage.getItem("role") === "ADMIN" && (
              <li>
                <Link
                  to="/adminAllProduct"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=92zOGOmxGkWj&format=png&color=9ca3af"
                    className="h-8 w-8 text-gray-500"
                  ></img>
                  <span className="ms-3">Admin Dashboard</span>
                </Link>
              </li>
            )}
            {localStorage.getItem("role") === "USER" && (
              <>
                <li>
                  <Link
                    to="/cartitem"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <img
                      src="https://img.icons8.com/?size=100&id=9720&format=png&color=9ca3af"
                      className="h-8 w-8 text-gray-500"
                    ></img>
                    <span className="ms-3">Cart</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orderHistory"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <img
                      src=" https://img.icons8.com/?size=100&id=z60PigXDY3EY&format=png&color=9ca3af"
                      className="h-8 w-8 text-gray-500"
                    ></img>
                    <span className="ms-3">OrderHistory</span>
                  </Link>
                </li>
              </>
            )}
            {localStorage.getItem("token") && (
              <>
            <li>
              <Link
                to="/profile"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  src=" https://img.icons8.com/?size=100&id=23265&format=png&color=9ca3af"
                  className="h-8 w-8 text-gray-500"
                ></img>
                <span className="ms-3">Profile</span>
              </Link>
            </li>
            <li>
              <a
                onClick={() => handleLogout()}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  src=" https://img.icons8.com/?size=100&id=8119&format=png&color=9ca3af"
                  className="h-8 w-8 text-gray-500"
                ></img>
                <span className="ms-3">LogOut</span>
              </a>
            </li></>)}
            {!localStorage.getItem("token") && (
              <>
            <li>
              <Link
                to="/login"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  src=" https://img.icons8.com/?size=100&id=60992&format=png&color=9ca3af"
                  className="h-8 w-8 text-gray-500"
                ></img>
                <span className="ms-3">LogIn</span>
              </Link>
            </li>
            <li>
              <Link
               to="/signup"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  src=" https://img.icons8.com/?size=100&id=inlIftdpm3D2&format=png&color=9ca3af"
                  className="h-8 w-8 text-gray-500"
                ></img>
                <span className="ms-3">Signup</span>
              </Link>
            </li></>)}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
