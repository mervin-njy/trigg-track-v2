import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ButtonSubmit from "../Interactions/ButtonSubmit";
import FormInput from "../Interactions/FormInput";
import LoadingSpinner from "../Loading/LoadingSpinner";

const Account = ({ setLoginPrompt }) => {
  // variables ----------------------------------------------------------------------------------------------------
  const { action } = useParams(); // login or signup or settings
  const showLogin = action === "login" ? true : false;
  const showSignup = action === "signup" ? true : false;
  const showSettings = action === "settings" ? true : false;
  const navigate = useNavigate();
  // Navigate to home
  const navigateToHome = () => {
    console.log("log in status:", "navigating to home.");
    navigate("/home");
  };

  // states -------------------------------------------------------------------------------------------------------
  const { fetchData, isLoading, data, error } = useFetch();
  const [accountInput, setAccountInput] = useState({
    username: "",
    password: "",
  });
  const [checkStatus, setCheckStatus] = useState(false);
  const [checkType, setCheckType] = useState(null); // "log in" || "sign up"
  const [requestTypes, setRequestTypes] = useState({
    accountEndpoint: "",
    fetchMethod: "",
  });

  // refs ---------------------------------------------------------------------------------------------------------
  const usernameRef = useRef();
  const passwordRef = useRef();

  //   event handlers ---------------------------------------------------------------------------------------------
  const handleChange = (event) => {
    event.preventDefault();
    console.log(accountInput);
    setAccountInput((prevAccountInput) => {
      return {
        ...prevAccountInput,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    // setFocus();
    console.log(`button clicked: ${event.target.name}`);
    console.log(accountInput);
    setCheckStatus(true);

    if (event.target.name === "Log in") {
      setRequestTypes({
        accountEndpoint: "loginUser",
        fetchMethod: "POST",
      });
    } else if (event.target.name === "Sign up") {
      setRequestTypes({
        accountEndpoint: "createUser",
        fetchMethod: "PUT",
      });
    }

    // if (event.target.name === "Log in") {
    //   console.log("- login");
    //   setLoginPrompt(false);
    //   navigateToHome();
    // } else if (event.target.name === "Sign up") {
    //   console.log("- signup");
    //   setSignup(true);
    // }
  };

  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // effects ------------------------------------------------------------------------------------------------------
  useEffect(() => {
    // http request here
    const controller = new AbortController();
    const fetchURL = `http://127.0.0.1:5001/${requestTypes.accountEndpoint}`;
    const fetchOptions = {
      method: requestTypes.fetchMethod, // "POST" => loginUser | "PUT" => createUser
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(accountInput),
      signal: controller.signal,
    };
    console.log("first useEffect triggered:", requestTypes);
    fetchData(fetchURL, fetchOptions);
  }, [checkStatus]);

  return (
    <>
      {showLogin && (
        <div className="w-4/12 mx-auto mt-10">
          <h1>Please fill in your log in details</h1>
          <div className="flex flex-wrap w-13/15 mx-auto mt-4">
            <h4 className="w-4/12">username:</h4>
            <FormInput
              className={"w-8/12"}
              type="text"
              name="username"
              value={accountInput.username}
              reference={usernameRef}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="flex flex-wrap w-13/15 mx-auto mt-4">
            <h4 className="w-4/12">password:</h4>
            <FormInput
              className={"w-8/12"}
              type="password"
              name="password"
              value={accountInput.password}
              reference={passwordRef}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="flex flex-wrap w-13/15 mx-auto mt-8">
            <h3>Forget password.</h3>
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
          </div>
        </div>
      )}
      {showSignup && <h1>SHOW SIGNUP CARD</h1>}
      {showSettings && <h1>SHOW SETTINGS CARD</h1>}

      {isObject(data) && (
        <section>
          {/* Display date's contents if fetched success and loaded */}
          {!isLoading && data && <h1>{data}</h1>}
          {/* While fetching, display load spinner */}
          {isLoading && (
            <div className="centered">
              <LoadingSpinner />
            </div>
          )}
          {/* Display error message if fetch has an error */}
          {!isLoading && error && <p>{error}</p>}
        </section>
      )}
    </>
  );
};

export default Account;
