import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ButtonGeneral from "../Interactions/ButtonGeneral";
import Login from "./Login";
import Signup from "./Signup";

const LandingPage = ({ setLoggedUserData, setUserConnections, setNewUser }) => {
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
      <div className="w-9/12 mt-40 mx-auto">
        <h1 className="tracking-wider text-6xl font-bold my-8">
          Welcome to Trigg.Track.
        </h1>
        <h2 className="tracking-wider text-2xl font-800 mb-8">
          Record your daily conditions and variables to track, to filter out
          potential triggers to avoid.
        </h2>
        <div className="flex flex-wrap justify-between mx-auto">
          <div className="w-9/20 h-max py-12 px-12 border-solid border-2 rounded-2xl mx-2 my-10 motion-safe:animate-float shadow-xl hover:motion-safe:animate-floatStop hover:shadow-3xl">
            {!showLogin && (
              <>
                <h2 className="text-2xl tracking-widest mb-8">
                  Are you an existing user?
                </h2>
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
            {showLogin && (
              <Login
                setLoggedUserData={setLoggedUserData}
                setUserConnections={setUserConnections}
              />
            )}
          </div>

          <div className="w-9/20 h-max py-12 px-12 border-solid border-2 rounded-2xl mx-2 my-10 motion-safe:animate-float shadow-xl hover:motion-safe:animate-floatStop hover:shadow-3xl">
            {!showSignup && (
              <>
                <h2 className="text-2xl tracking-widest mb-8">
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
            {showSignup && <Signup setNewUser={setNewUser} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
