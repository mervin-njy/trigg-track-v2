import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ButtonEmptyBg from "../Interactions/ButtonEmptyBg";
import ButtonError from "../Interactions/ButtonError";
import ButtonGeneral from "../Interactions/ButtonGeneral";
import FormInput from "../Interactions/FormInput";
import LoadingSpinner from "../Loading/LoadingSpinner";

const Signup = ({ setLoggedUserData }) => {
  // states -------------------------------------------------------------------------------------------------------
  const [showSignup, setShowSignup] = useState(true);
  const { fetchData, isLoading, data, error } = useFetch();
  const [accountInput, setAccountInput] = useState({
    username: "",
    password: "",
    userType: "Health Logger",
    accessType: "Public",
    displayName: "",
    profession: "",
    email: "",
    bio: "",
  });
  const [checkStatus, setCheckStatus] = useState(false); // toggle to try http request
  const [requestTypes, setRequestTypes] = useState({
    accountEndpoint: "",
    fetchMethod: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // refs ---------------------------------------------------------------------------------------------------------
  const usernameRef = useRef();
  const passwordRef = useRef();
  const userTypeRef = useRef();
  const accessTypeRef = useRef();
  const displayNameRef = useRef();
  const professionRef = useRef();
  const emailRef = useRef();
  const bioRef = useRef();

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
      setShowSignup(true);
    } else if (event.target.name === "Sign up") {
      // 1. toggle checkStatus state for http request
      setCheckStatus((prevCheckStatus) => {
        return !prevCheckStatus;
      });

      // 2. set http request type based on button type
      setRequestTypes({
        accountEndpoint: "createUser",
        fetchMethod: "PUT",
      });
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
        setShowSuccessMessage(true);
        console.log("2nd useEffect", data);
      } else {
        setShowSignup(false); // & display retry button
      }
    }
  }, [data]);

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      {showSignup && (
        <div className="mx-auto">
          {/* FOR: userCreate" */}
          <h1 className="text-xl mb-14">Please fill in your account info</h1>
          <div className="flex flex-wrap justify-between mt-8">
            <h4 className="w-3/10 text-lg tracking-widest">username:</h4>
            <FormInput
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
            <h4 className="w-3/10 text-lg tracking-widest">password:</h4>
            <FormInput
              type="password"
              name="password"
              value={accountInput.password}
              reference={passwordRef}
              width={"70%"}
              onChange={handleChange}
              required={true}
            />
          </div>

          <div className="mt-5">
            <div className="flex flex-wrap justify-between">
              <h4 className="w-3/10 text-lg tracking-widest">user type:</h4>
              <FormInput
                type="radio"
                name="Health Logger"
                value={accountInput.userType}
                reference={userTypeRef}
                checked={accountInput.userType === "Health Logger"}
                width={"3%"}
                onChange={handleChange}
                required={true}
              />
              <label className="w-9/15 text-lg tracking-wider">
                Health Logger
              </label>
            </div>
            <div className="flex flex-wrap justify-between mt-3">
              <div className="w-3/10"></div>
              <FormInput
                type="radio"
                name="Service Provider"
                value={accountInput.userType}
                reference={userTypeRef}
                checked={accountInput.userType === "Service Provider"}
                width={"3%"}
                onChange={handleChange}
                required={true}
              />
              <label className="w-9/15 text-lg tracking-wider">
                Service Provider
              </label>
            </div>
          </div>

          <div className="flex flex-wrap justify-between mt-5">
            <h4 className="w-3/10 text-lg tracking-widest">display name:</h4>
            <FormInput
              type="text"
              name="displayName"
              value={accountInput.displayName}
              reference={displayNameRef}
              width={"70%"}
              onChange={handleChange}
              required={true}
            />
          </div>

          <div className="flex flex-wrap justify-between mt-5">
            <h4 className="w-3/10 text-lg tracking-widest">profession:</h4>
            <FormInput
              type="text"
              name="profession"
              value={accountInput.profession}
              reference={professionRef}
              width={"70%"}
              onChange={handleChange}
              required={true}
            />
          </div>

          <div className="flex flex-wrap justify-between mt-5">
            <h4 className="w-3/10 text-lg tracking-widest">email:</h4>
            <FormInput
              type="text"
              name="email"
              value={accountInput.email}
              reference={emailRef}
              width={"70%"}
              onChange={handleChange}
              required={true}
            />
          </div>

          <div className="flex flex-wrap justify-between mt-5">
            <h4 className="w-3/10 text-lg tracking-widest">bio:</h4>
            <FormInput
              type="text"
              name="bio"
              value={accountInput.bio}
              reference={bioRef}
              width={"70%"}
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

      {isObject(data) && !showLogin && (
        <section>
          {/* Display date's contents if fetched success and loaded */}
          {!isLoading &&
            data &&
            (showSuccessMessage ? (
              <div>
                <h2 className="text-3xl mb-8">Account creation successful.</h2>
              </div>
            ) : (
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
            ))}

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

export default Signup;
