import React from "react";
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ButtonSubmit from "../Interactions/ButtonSubmit";

const LandingPage = () => {
  const handleClick = (event) => {
    console.log(`Going to ${event.target.name}.`);
  };

  return (
    <>
      <div className="w-10/12 my-20 mx-auto">
        <h1 className="text-6xl font-bold">Welcome to Trigg.Track.</h1>
        <h2 className="text-xl font-400">
          Record your daily conditions and variables to track, to filter out
          potential triggers to avoid.
        </h2>
        <div>
          <div>
            <h2 className="text-xs font-400">Log in to resume your journey!</h2>
            <NavLink to="/account/login">
              <ButtonSubmit
                displayName={"Log in"}
                category={"account"}
                width={"12rem"}
                padding={"0.2rem"}
                margin={"0.1rem 0.5rem"}
                colourBackground={"yellowMain"}
                colourText={"yellowAccent"}
                onClick={handleClick}
              />
            </NavLink>
          </div>
          <div>
            <h2>Create a free account with us today!</h2>
            <NavLink to="/account/signup">
              <ButtonSubmit
                displayName={"Sign up"}
                category={"account"}
                width={"12rem"}
                padding={"0.2rem"}
                margin={"0.1rem 0.5rem"}
                colourBackground={"yellowMain"}
                colourText={"yellowAccent"}
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
