import React, { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaKey,
  FaUserTag,
  FaHouseUser,
  FaUserTie,
} from "react-icons/fa";
import {
  MdClose,
  MdAccessibility,
  MdPublic,
  MdPrivateConnectivity,
  MdDriveFileRenameOutline,
  MdWork,
  MdEmail,
  MdDescription,
} from "react-icons/md";

import useFetch from "../../hooks/useFetch";
import ButtonError from "../Interactions/ButtonError";
import ButtonGeneral from "../Interactions/ButtonGeneral";
import InputGeneral from "../Interactions/InputGeneral";
import LoadingSpinner from "../Loading/LoadingSpinner";

// START OF COMPONENT ***********************************************************************************************************************
// FOR: userCreate
const Signup = ({ setNewUser, setShowSignup }) => {
  // states -------------------------------------------------------------------------------------------------------
  const [showFields, setshowFields] = useState(true);
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

  // event handlers -----------------------------------------------------------------------------------------------
  const handleChange = (event) => {
    event.preventDefault();
    setAccountInput((prevAccountInput) => {
      console.log("Signup -", "handleChange, before:", accountInput);
      return {
        ...prevAccountInput,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log("Signup -", `button clicked: ${event.target.name}`);

    if (event.target.name === "Sign up") {
      console.log("Signup -", "submitted details:", accountInput);

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

    if (event.target.name === "Retry") {
      setshowFields(true);
    }
  };

  const handleClose = (event) => {
    event.preventDefault();
    console.log("Signup -", "Closing");
    setShowSignup((prevShowSignup) => {
      return !prevShowSignup;
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
    console.log("Signup -", "1st useEffect triggered:", requestTypes);
    fetchData(fetchURL, fetchOptions);
  }, [checkStatus]);

  // #2 - once data fetched => store in state
  useEffect(() => {
    // a. if data fetching is a success => set state for user info + navigate to home
    if (isObject(data)) {
      console.log("Signup -", "error:", data.status);
      if (data.status === "okay") {
        // lift state: logged in user data
        setNewUser(true);
        setShowSuccessMessage(true);
        console.log("Signup -", "2nd useEffect", data);
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
              Let's set up your account info
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
              <h4 className="text-md tracking-widest my-auto">username:</h4>
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
              <h4 className="text-md tracking-widest my-auto">password:</h4>
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

          {/* Choose userType */}
          <div className="mt-5">
            <div className="flex flex-wrap justify-between">
              {/* label */}
              <div className="flex flex-wrap justify-start w-3/12">
                <FaUserTag size={18} className="my-auto mr-3" />
                <h4 className="text-md tracking-widest my-auto">user type:</h4>
              </div>
              {/* selection 1.*/}
              <InputGeneral
                type="radio"
                name="userType"
                value="Health Logger"
                reference={userTypeRef}
                checked={accountInput.userType === "Health Logger"}
                width={"3%"}
                onChange={handleChange}
              />
              <div className="flex flex-wrap justify-start w-9/15">
                <FaHouseUser size={24} className="my-auto mr-3" />
                <label className="text-md tracking-wider my-auto">
                  Health Logger
                </label>
              </div>
            </div>

            <div className="flex flex-wrap justify-between mt-2">
              {/* label placeholder */}
              <div className="w-3/12"></div>
              {/* selection 2.*/}
              <InputGeneral
                type="radio"
                name="userType"
                value="Service Provider"
                reference={userTypeRef}
                checked={accountInput.userType === "Service Provider"}
                width={"3%"}
                onChange={handleChange}
              />
              <div className="flex flex-wrap justify-start w-9/15">
                <FaUserTie size={24} className="my-auto mr-3" />
                <label className="text-md tracking-wider my-auto">
                  Service Provider
                </label>
              </div>
            </div>
          </div>

          {/* Choose accessType */}
          <div className="mt-5">
            <div className="flex flex-wrap justify-between">
              {/* label */}
              <div className="flex flex-wrap justify-start w-3/12">
                <MdAccessibility size={18} className="my-auto mr-3" />
                <h4 className="text-md tracking-widest my-auto">access:</h4>
              </div>
              {/* selection 1.*/}
              <InputGeneral
                type="radio"
                name="accessType"
                value="Public"
                reference={accessTypeRef}
                checked={accountInput.accessType === "Public"}
                width={"3%"}
                onChange={handleChange}
              />
              <div className="flex flex-wrap justify-start w-9/15">
                <MdPublic size={24} className="my-auto mr-3" />
                <label className="w-9/15 text-md tracking-wider my-auto">
                  Public
                </label>
              </div>
            </div>
            <div className="flex flex-wrap justify-between mt-2">
              {/* label placeholder */}
              <div className="w-3/12"></div>
              {/* selection 2.*/}
              <InputGeneral
                type="radio"
                name="accessType"
                value="Private"
                reference={accessTypeRef}
                checked={accountInput.accessType === "Private"}
                width={"3%"}
                onChange={handleChange}
              />
              <div className="flex flex-wrap justify-start w-9/15">
                <MdPrivateConnectivity size={24} className="my-auto mr-3" />
                <label className="w-9/15 text-md tracking-wider my-auto">
                  Private
                </label>
              </div>
            </div>
          </div>

          {/* MdDriveFileRenameOutline */}
          <div className="flex flex-wrap justify-between mt-5">
            {/* label */}
            <div className="flex flex-wrap justify-start w-3/12">
              <MdDriveFileRenameOutline size={18} className="my-auto mr-3" />
              <h4 className="text-md tracking-widest my-auto">alias:</h4>
            </div>
            <InputGeneral
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
            {/* label */}
            <div className="flex flex-wrap justify-start w-3/12">
              <MdWork size={18} className="my-auto mr-3" />
              <h4 className="text-md tracking-widest my-auto">profession:</h4>
            </div>
            <InputGeneral
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
            {/* label */}
            <div className="flex flex-wrap justify-start w-3/12">
              <MdEmail size={18} className="my-auto mr-3" />
              <h4 className="text-md tracking-widest my-auto">email:</h4>
            </div>
            <InputGeneral
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
            {/* label */}
            <div className="flex flex-wrap justify-start w-3/12">
              <MdDescription size={18} className="my-auto mr-3" />
              <h4 className="text-md tracking-widest my-auto">bio:</h4>
            </div>
            <InputGeneral
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

      {isObject(data) && !showFields && (
        <section>
          {/* Display date's contents if fetched success and loaded */}
          {!isLoading &&
            data &&
            (showSuccessMessage ? (
              <div>
                <h2 className="text-2xl mb-8 my-auto">
                  Account creation successful.
                </h2>
                <h2 className="text-2xl mb-8 my-auto">You may log in now.</h2>
              </div>
            ) : (
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
