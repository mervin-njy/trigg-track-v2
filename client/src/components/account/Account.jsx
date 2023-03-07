import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ButtonEmptyBg from "../Interactions/ButtonEmptyBg";
import ButtonError from "../Interactions/ButtonError";
import ButtonGeneral from "../Interactions/ButtonGeneral";
import FormInput from "../Interactions/FormInput";
import LoadingSpinner from "../Loading/LoadingSpinner";

const Account = ({ setLoggedUserData, action }) => {
  // variables ----------------------------------------------------------------------------------------------------
  const [showLogin, setShowLogin] = useState(action === "login" ? true : false);
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
  const [checkStatus, setCheckStatus] = useState(false); // toggle to try http request
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

    if (event.target.name === "Retry") {
      if (event.target.id === "login") setShowLogin(true);
    } else {
      // 1. toggle checkStatus state for http request
      setCheckStatus((prevCheckStatus) => {
        return !prevCheckStatus;
      });

      // 2. set http request type based on button type
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
    }
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
      console.log("error:", data.status);
      if (data.status !== "error") {
        // lift state: logged in user data
        setLoggedUserData(data);
        navigateToPage("home");
        console.log("2nd useEffect", data);
      } else {
        setShowLogin(false);
      }
    }
  }, [data]);

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      {showLogin && (
        <div className="mx-auto">
          {/* FOR: userlogin" */}
          <h1 className="text-3xl mb-14">Please fill in your log in details</h1>
          <div className="flex flex-wrap justify-between mt-8">
            <h4 className="w-3/12 text-2xl">username:</h4>
            <FormInput
              type="text"
              name="username"
              value={accountInput.username}
              reference={usernameRef}
              width={"75%"}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="flex flex-wrap justify-between mt-5">
            <h4 className="w-3/12 text-2xl">password:</h4>
            <FormInput
              type="password"
              name="password"
              value={accountInput.password}
              reference={passwordRef}
              width={"75%"}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="flex flex-wrap justify-between mx-auto mt-8">
            <ButtonEmptyBg
              displayName={"Forget password."}
              category={"account"}
              width={"10rem"}
              textDecoration={"underline"}
              fontSize={"1rem"}
              padding={"0.4rem"}
              margin={"1rem 0"}
              onClick={handleClick}
            />
            <ButtonGeneral
              displayName={"Log in"}
              category={"account"}
              width={"10rem"}
              fontSize={"1.3rem"}
              padding={"0.4rem"}
              margin={"1rem 0"}
              onClick={handleClick}
            />
          </div>
        </div>
      )}

      {showSignup && (
        <div className="mx-auto">
          {/* FOR: userCreate" */}
          <h1 className="text-3xl mb-14">Please fill in your account info</h1>
          <div className="flex flex-wrap justify-between mt-8">
            <h4 className="w-3/12 text-2xl">username:</h4>
            <FormInput
              type="text"
              name="username"
              value={accountInput.username}
              reference={usernameRef}
              width={"75%"}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="flex flex-wrap justify-between mt-5">
            <h4 className="w-3/12 text-2xl">password:</h4>
            <FormInput
              type="password"
              name="password"
              value={accountInput.password}
              reference={passwordRef}
              width={"75%"}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="flex flex-wrap justify-between right-0 mt-8">
            <ButtonGeneral
              displayName={"Sign up"}
              category={"account"}
              width={"10rem"}
              fontSize={"1.3rem"}
              padding={"0.4rem"}
              margin={"1rem 0"}
              onClick={handleClick}
            />
          </div>
        </div>
      )}

      {showSettings && <h1>SHOW SETTINGS CARD</h1>}

      {isObject(data) && !showLogin && (
        <section>
          {/* Display date's contents if fetched success and loaded */}
          {!isLoading && data && (
            <div>
              <h2 className="text-3xl mb-8">{data.message}</h2>
              <ButtonError
                displayName={"Retry"}
                category={"login"}
                width={"10rem"}
                fontSize={"1.3rem"}
                padding={"0.4rem"}
                margin={"1rem 0"}
                onClick={handleClick}
              />
            </div>
          )}

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
