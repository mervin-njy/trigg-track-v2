import React from "react";
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ButtonGeneral from "../Interactions/ButtonGeneral";

const LandingPage = () => {
  const handleClick = (event) => {
    console.log(`Going to ${event.target.name}.`);
  };

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
          <div className="w-5/12 py-10 px-20 border-solid border-2 rounded-2xl mx-10 my-20 motion-safe:animate-vibrateNormal shadow-xl hover:motion-safe:animate-vibrateSlow hover:shadow-3xl">
            <h2 className="text-3xl font-400 mb-8">
              Log in to resume your journey!
            </h2>
            <NavLink to="/account/login">
              <ButtonGeneral
                displayName={"Log in"}
                category={"account"}
                width={"12rem"}
                fontSize={"1.2rem"}
                padding={"0.4rem"}
                margin={"1rem 0.5rem"}
                onClick={handleClick}
              />
            </NavLink>
          </div>
          <div className="w-5/12 py-10 px-20 border-solid border-2 rounded-2xl mx-10 my-20 motion-safe:animate-vibrateNormal shadow-xl hover:motion-safe:animate-vibrateSlow hover:shadow-3xl">
            <h2 className="text-3xl font-400 mb-8">
              Create a free account with us today!
            </h2>
            <NavLink to="/account/signup">
              <ButtonGeneral
                displayName={"Sign up"}
                category={"account"}
                width={"12rem"}
                fontSize={"1.2rem"}
                padding={"0.4rem"}
                margin={"1rem 0.5rem"}
                onClick={handleClick}
              />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
