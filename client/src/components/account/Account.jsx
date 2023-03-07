import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ButtonEmptyBg from "../Interactions/ButtonEmptyBg";
import ButtonGeneral from "../Interactions/ButtonGeneral";
import FormInput from "../Interactions/FormInput";
import LoadingSpinner from "../Loading/LoadingSpinner";

const Account = ({ setLoggedUserData }) => {
  // variables ----------------------------------------------------------------------------------------------------
  const { action } = useParams(); // login or signup or settings
  const showLogin = action === "login" ? true : false;
  const showSignup = action === "signup" ? true : false;
  const showSettings = action === "settings" ? true : false;
  const navigate = useNavigate();
  // Navigate to home
  const navigateToPage = (page) => {
    console.log(`log in status:", "navigating to ${page}.`);
    navigate(`/${page}`);
  };

  // states -------------------------------------------------------------------------------------------------------
  const { fetchData, isLoading, data, error } = useFetch();
  const [accountInput, setAccountInput] = useState({
    username: "",
    password: "",
  });
  const [checkStatus, setCheckStatus] = useState(false);
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
    setCheckStatus((prevCheckStatus) => {
      return !prevCheckStatus;
    });

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
    } else if (event.target.name === "Retry") navigateToPage("account/login");
  };

  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // effects ------------------------------------------------------------------------------------------------------
  // #1 - http request
  useEffect(() => {
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
    console.log("1st useEffect triggered:", requestTypes);
    fetchData(fetchURL, fetchOptions);
  }, [checkStatus]);

  // #2 - once data fetched => store in state
  useEffect(() => {
    // a. if data fetching is a success => set state for user info + navigate to home
    if (isObject(data)) {
      // lift state: logged in user data
      setLoggedUserData(data);
      navigateToPage("home");
      console.log("2nd useEffect", data);
    }
  }, [data]);

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      {showLogin && (
        <div className="w-4/12 mx-auto mt-40">
          {/* FOR: "/account/login" */}
          <h1 className="text-3xl">Please fill in your log in details</h1>
          <div className="flex flex-wrap w-13/15 mt-8">
            <h4 className="w-3/12 text-2xl">username:</h4>
            <FormInput
              type="text"
              name="username"
              value={accountInput.username}
              reference={usernameRef}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="flex flex-wrap w-13/15 mt-5">
            <h4 className="w-3/12 text-2xl">password:</h4>
            <FormInput
              type="password"
              name="password"
              value={accountInput.password}
              reference={passwordRef}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="flex flex-wrap w-13/15 mx-auto mt-8">
            <ButtonEmptyBg
              displayName={"Forget password."}
              category={"account"}
              width={"10rem"}
              fontSize={"1rem"}
              padding={"0.4rem"}
              margin={"1rem 0.5rem"}
              onClick={handleClick}
            />
            <ButtonGeneral
              displayName={"Log in"}
              category={"account"}
              width={"8rem"}
              fontSize={"1.2rem"}
              padding={"0.4rem"}
              margin={"1rem 0.5rem"}
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
          {!isLoading && data && <h1>LOG IN SUCCESS.</h1>}
          {/* While fetching, display load spinner */}
          {isLoading && (
            <div className="centered">
              <LoadingSpinner />
            </div>
          )}
          {/* Display error message if fetch has an error */}
          {!isLoading && error && (
            <div>
              <h2>{error}</h2>
              <ButtonGeneral
                displayName={"Retry"}
                category={"account"}
                fontSize={"1.2rem"}
                width={"12rem"}
                padding={"0.4rem"}
                margin={"1rem 0.5rem"}
                onClick={handleClick}
              />
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Account;
