import React, { useState, useRef, useEffect } from "react";
import { FaUser, FaKey } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ButtonEmptyBg from "../Interactions/ButtonEmptyBg";
import ButtonError from "../Interactions/ButtonError";
import ButtonGeneral from "../Interactions/ButtonGeneral";
import InputGeneral from "../Interactions/InputGeneral";
import LoadingSpinner from "../Loading/LoadingSpinner";

// START OF COMPONENT ***********************************************************************************************************************
// FOR: userLogin
const Login = ({ setLoggedUserData, setShowLogin }) => {
  // variables ----------------------------------------------------------------------------------------------------
  const navigate = useNavigate();
  // Navigate to home
  const navigateToPage = (page) => {
    console.log(`log in status:", "navigating to ${page}.`);
    navigate(`/${page}`);
  };

  // states -------------------------------------------------------------------------------------------------------
  const [showFields, setshowFields] = useState(true);
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

  // event handlers -----------------------------------------------------------------------------------------------
  const handleChange = (event) => {
    // event.preventDefault();
    setAccountInput((prevAccountInput) => {
      console.log("Login -", "handleChange, before:", accountInput);
      return {
        ...prevAccountInput,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    // setFocus();
    console.log("Login -", `button clicked: ${event.target.name}`);

    if (event.target.name === "Log in") {
      console.log("Login -", "submitting:", accountInput);

      // 1. toggle checkStatus state for http request
      setCheckStatus((prevCheckStatus) => {
        return !prevCheckStatus;
      });

      // 2. set http request type based on button type
      setRequestTypes({
        accountEndpoint: "loginUser",
        fetchMethod: "POST",
      });
    }

    if (event.target.name === "Retry") {
      setshowFields(true);
    }
  };

  const handleClose = (event) => {
    event.preventDefault();
    console.log("Signup -", "Closing");
    setShowLogin((prevShowLogin) => {
      return !prevShowLogin;
    });
  };

  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  function toPascalCase(str) {
    const splitStr = str.toLowerCase().split(" ");
    let newStr = "";
    for (const word of splitStr) {
      newStr += word[0].toUpperCase() + word.slice(1) + " ";
    }
    return newStr;
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
    console.log("Login -", "1st useEffect triggered:", requestTypes);
    fetchData(fetchURL, fetchOptions);
  }, [checkStatus]);

  // #2 - once data fetched => store in state
  useEffect(() => {
    // a. if data fetching is a success => set state for user info + navigate to home
    if (isObject(data)) {
      console.log("Login -", "error:", data.status);
      if (data.status !== "error") {
        // lift states: logged in user data
        setLoggedUserData(data);

        navigateToPage("home");
        console.log("Login -", "2nd useEffect", data);
      } else {
        setshowFields(false); // & display retry button
      }
    }
  }, [data]);

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      {showFields && (
        <div className="mx-auto">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-2xl tracking-wider mb-14">
              Please fill in your details
            </h1>
            <MdClose
              size={24}
              className="cursor-pointer my-auto w-1/12 mb-14 hover:font-bold hover:text-main2"
              id="Close"
              onClick={handleClose}
            />
          </div>
          <div className="flex flex-wrap justify-between mt-8">
            <div className="flex flex-wrap justify-start w-3/12">
              <FaUser size={18} className="my-auto mr-3" />
              <h4 className="text-lg tracking-widest my-auto">username:</h4>
            </div>
            <InputGeneral
              type="text"
              name="username"
              value={accountInput.username}
              reference={usernameRef}
              width={"70%"}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="flex flex-wrap justify-between mt-5">
            <div className="flex flex-wrap justify-start w-3/12">
              <FaKey size={18} className="my-auto mr-3" />
              <h4 className="text-lg tracking-widest my-auto">password:</h4>
            </div>
            <InputGeneral
              type="password"
              name="password"
              value={accountInput.password}
              reference={passwordRef}
              width={"70%"}
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
              padding={"0.4rem 0"}
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

      {isObject(data) && !showFields && (
        <section>
          {/* Display date's contents if fetched success and loaded */}
          {!isLoading && data && (
            <div>
              <h2 className="text-2xl tracking-widest text-redAccent font-bold my-auto mb-8">
                {toPascalCase(data.message)}
              </h2>
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

export default Login;
