import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ButtonGeneral from "../Interactions/ButtonGeneral";
import Login from "./Login";
import Signup from "./Signup";

const LandingPage = ({ setLoggedUserData }) => {
  // states -------------------------------------------------------------------------------------------------------
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  // const [action, setAction] = useState(null);

  //   event handlers ---------------------------------------------------------------------------------------------
  const handleClick = (event) => {
    console.log(`showing form: ${event.target.name}.`);

    if (event.target.name === "Log in") {
      // setAction("login");
      setShowLogin((prevShowLogin) => {
        return !prevShowLogin;
      });
    } else if (event.target.name === "Sign up") {
      // setAction("signup");
      setShowSignup((prevShowSignup) => {
        return !prevShowSignup;
      });
    }
  };

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      <div className="w-10/12 mt-40 mx-auto">
        <h1 className="font-oxygen tracking-wider text-8xl font-bold my-10">
          Welcome to Trigg.Track.
        </h1>
        <h2 className="font-oxygen tracking-wider text-4xl font-800 mb-10">
          Record your daily conditions and variables to track, to filter out
          potential triggers to avoid.
        </h2>
        <div className="flex flex-wrap justify-between mx-auto">
          <div className="w-5/12 h-max py-16 px-16 border-solid border-2 rounded-2xl mx-10 my-20 motion-safe:animate-vibrateNormal shadow-xl hover:motion-safe:animate-vibrateSlow hover:shadow-3xl">
            {!showLogin && (
              <>
                <h2 className="text-3xl font-400 mb-8">Existing user?</h2>
                <ButtonGeneral
                  displayName={"Log in"}
                  category={"account"}
                  width={"12rem"}
                  fontSize={"1.2rem"}
                  padding={"0.4rem"}
                  margin={"1rem 0"}
                  onClick={handleClick}
                />
              </>
            )}
            {showLogin && <Login setLoggedUserData={setLoggedUserData} />}
          </div>

          <div className="w-5/12 h-max py-16 px-16 border-solid border-2 rounded-2xl mx-10 my-20 motion-safe:animate-vibrateNormal shadow-xl hover:motion-safe:animate-vibrateSlow hover:shadow-3xl">
            {!showSignup && (
              <>
                <h2 className="text-3xl font-400 mb-8">
                  Create a free account with us today!
                </h2>
                <ButtonGeneral
                  displayName={"Sign up"}
                  category={"account"}
                  width={"12rem"}
                  fontSize={"1.2rem"}
                  padding={"0.4rem"}
                  margin={"1rem 0"}
                  onClick={handleClick}
                />
              </>
            )}
            {showSignup && <Signup setLoggedUserData={setLoggedUserData} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
