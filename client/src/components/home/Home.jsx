import React, { state } from "react";

const Home = ({ loggedUserData }) => {
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

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      <h1>Welcome {loggedUserData.displayName}</h1>
    </>
  );
};

export default Home;
