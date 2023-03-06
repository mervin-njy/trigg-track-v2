import React from "react";
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ButtonSubmit from "../Interactions/ButtonSubmit";

const LandingPage = ({ setLoginPrompt }) => {
  const handleClick = (event) => {
    console.log(`Going to ${event.target.name}.`);
  };

  return (
    <div>
      <h1>Welcome to Trigg.Track.</h1>
      <h2>
        Record your daily conditions and variables to track, to filter out
        potential triggers to avoid.
      </h2>
      <div>
        <div>
          <h2>Log in to resume your journey!</h2>
          <NavLink to="/account/login">
            <ButtonSubmit
              displayName={"Log in"}
              category={"account"}
              width={"5rem"}
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
              width={"5rem"}
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
  );
};

export default LandingPage;
