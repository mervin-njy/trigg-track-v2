import React, { useState, useEffect } from "react";
import ButtonAdmin from "../Interactions/ButtonAdmin";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../Loading/LoadingSpinner";

const AccountManager = ({ adminInfo }) => {
  // states -------------------------------------------------------------------------------------------------------
  const [showUsers, setShowUsers] = useState(false);
  const [showResult, setShowResult] = useState(false);
  //   const [checkStatus, setCheckStatus] = useState(false); // toggle to try http request
  const { fetchData, isLoading, data, error } = useFetch();

  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  //   function toPascalCase(str) {
  //     const splitStr = str.toLowerCase().split(" ");
  //     let newStr = "";
  //     for (const word of splitStr) {
  //       newStr += word[0].toUpperCase() + word.slice(1) + " ";
  //     }
  //     return newStr;
  //   }

  // effects ------------------------------------------------------------------------------------------------------
  // #1 - http request - on mount
  useEffect(() => {
    const controller = new AbortController();
    const fetchURL = `http://127.0.0.1:5001/getUsers`;
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${adminInfo.access}`,
      },
      signal: controller.signal,
    };
    console.log(
      "AccountManager - ",
      "1st useEffect triggered:",
      "ADMIN - GET /getUsers"
    );
    fetchData(fetchURL, fetchOptions);
    setShowResult(true);
  }, []);

  //   // #2 - once data fetched => store in state
  //   useEffect(() => {
  //     // a. if data fetching is a success => set state for user info + navigate to home
  //     if (isObject(data)) {
  //       console.log("Signup -", "error:", data.status);
  //       if (data.status === "okay") {
  //         // lift state: logged in user data
  //         setShowUsers(true);
  //         console.log("AccountManager - ", "2nd useEffect", data);
  //       } else {
  //         setShowSignup(false); // & display retry button
  //       }
  //     }
  //   }, [data]);

  // render component --------------------------------------------------------------------------------------------
  return (
    <div>
      {/* Display date's contents if fetched success and loaded */}
      {!isLoading && data && (
        <div>
          {data.map((user, id) => {
            return (
              <div
                key={id}
                className="h-max py-12 px-12 border-solid border-2 rounded-2xl mx-2 my-10 hover:motion-safe:animate-pulsateLittle hover:shadow-3xl"
              >
                {user.username}
              </div>
            );
          })}
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
        </div>
      )}
    </div>
  );
};

export default AccountManager;
