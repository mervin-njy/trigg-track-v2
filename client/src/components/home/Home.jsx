import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AccountManager from "../admin/AccountManager";
import LoggerHome from "./LoggerHome";
// import LoadingSpinner from "../Loading/LoadingSpinner";

// START OF COMPONENT ***********************************************************************************************************************
const Home = ({ loggedUserData }) => {
  // variables ----------------------------------------------------------------------------------------------------
  let colText = "text-purpleAccent"; // default: health logger

  if (loggedUserData.userType === "Admin") {
    colText = "text-orangeMain";
  }

  if (loggedUserData.userType === "Service Provider") {
    colText = "text-greenAccent";
  }
  // states -------------------------------------------------------------------------------------------------------
  const { fetchData, isLoading, data, error } = useFetch();
  const [checkStatus, setCheckStatus] = useState(false);
  const [requestTypes, setRequestTypes] = useState({
    accountEndpoint: "",
    fetchMethod: "",
  });

  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // effects ------------------------------------------------------------------------------------------------------
  // #1 - http request
  useEffect(() => {
    // const controller = new AbortController();
    // const fetchURL = `http://127.0.0.1:5001/${requestTypes.accountEndpoint}`;
    // const fetchOptions = {
    //   method: requestTypes.fetchMethod, // "POST" => loginUser | "PUT" => createUser
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(getUserInput),
    //   signal: controller.signal,
    // };
    // console.log("1st useEffect triggered:", requestTypes);
    // fetchData(fetchURL, fetchOptions);
  }, []);

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      <div className="w-9/12 mt-40 mb-40 mx-auto">
        <h1 className="tracking-wider text-6xl font-bold my-8 mb-20">
          Welcome, <span className={colText}>{loggedUserData.displayName}</span>
          .
        </h1>

        {loggedUserData.userType === "Admin" && (
          <AccountManager adminInfo={loggedUserData} />
        )}

        {loggedUserData.userType === "Health Logger" && (
          <LoggerHome loggerInfo={loggedUserData} />
        )}
      </div>
    </>
  );
};

export default Home;
