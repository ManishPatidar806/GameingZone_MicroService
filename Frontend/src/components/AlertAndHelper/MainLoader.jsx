import React from "react";

const MainLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <div>
        {" "}
        <span
          className="loader relative block"
          style={{
            width: "120px",
            height: "90px",
            margin: "0 auto",
          }}
        >
          {/* The before pseudo-element */}
          <span
            className="absolute bottom-7 left-[50%] translate-x-[-50%] rounded-full"
            style={{
              height: "30px",
              width: "30px",
              background: "#3B82F6", // Blue color
              animation: "loading-bounce 0.5s ease-in-out infinite alternate",
            }}
          ></span>

          {/* The after pseudo-element */}
          <span
            className="absolute top-0 right-0"
            style={{
              height: "7px",
              width: "45px",
              borderRadius: "4px",
              boxShadow: "0 5px 0 #fff, -35px 50px 0 #fff, -70px 95px 0 #fff",
              animation: "loading-step 1s ease-in-out infinite",
            }}
          ></span>
        </span>
        <p className="mt-5 text-4xl text-blue-600 text-center">Loading...</p>
        <p className="mt-2 text-xl text-blue-500 text-center">
          <p className="text-center">Please wait while the server starts.</p>This may take a few moments as
          the Spring Boot project initializes.
        </p>
      </div>
      {/* Styles for the keyframes */}
      <style jsx>{`
        @keyframes loading-bounce {
          0% {
            transform: scale(1, 0.7);
          }
          40% {
            transform: scale(0.8, 1.2);
          }
          60% {
            transform: scale(1, 1);
          }
          100% {
            bottom: 140px;
          }
        }

        @keyframes loading-step {
          0% {
            box-shadow: 0 10px 0 rgba(0, 0, 0, 0), 0 10px 0 #fff,
              -35px 50px 0 #fff, -70px 90px 0 #fff;
          }
          100% {
            box-shadow: 0 10px 0 #fff, -35px 50px 0 #fff, -70px 90px 0 #fff,
              -70px 90px 0 rgba(0, 0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default MainLoader;
