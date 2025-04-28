import React from "react";
import { useNavigate } from "react-router-dom";

const FailedPayment = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 h-screen w-screen flex  gap-y-5 justify-center items-center ">
      <div className="bg-white   p-10 shadow-lg md:mx-auto flex flex-col gap-y-5 justify-center items-center">
        <svg
          fill="#ffffff"
          height="64px"
          width="64px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="-215.6 -215.6 921.20 921.20"
          xml:space="preserve"
          stroke="#ffffff"
          className="flex justify-center items-center text-center"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0">
            <rect
              x="-215.6"
              y="-215.6"
              width="921.20"
              height="921.20"
              rx="460.6"
              fill="#ff0505"
              strokewidth="0"
            ></rect>
          </g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon>{" "}
          </g>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Failed!
          </h3>
          <p className="text-gray-600 my-2">You have enter wrong details!.</p>
          <p>Try again!</p>
          <div className="py-10 text-center" onClick={() => navigate("/")}>
            <a className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
              GO BACK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailedPayment;
