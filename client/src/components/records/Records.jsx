import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";

const Records = ({ loggedUserData }) => {
  // variables ----------------------------------------------------------------------------------------------------
  const date = new Date().toISOString().split("T")[0];

  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // states -------------------------------------------------------------------------------------------------------
  const [entriesOptions, setEntriesOptions] = useState({
    username: loggedUserData.username,
    date: "",
  });
  const { fetchData, isLoading, data, error } = useFetch();

  //   event handlers ---------------------------------------------------------------------------------------------
  const handleChange = (event) => {
    console.log("Records - selection changed: ", event.target.name);
    setEntriesOptions(true);
  };

  // effects ------------------------------------------------------------------------------------------------------
  // #1 - http request to get logged entries with input date
  useEffect(() => {
    const controller = new AbortController();
    const fetchURL = `http://127.0.0.1:5001/user/getRecordEntries`;
    // req.body => username + date
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${loggedUserData.access}`,
      },
      body: JSON.stringify({ entriesOptions }),
      signal: controller.signal,
    };

    console.log(
      "Records - ",
      "1st useEffect triggered:",
      "LOGGER - POST /getRecordEntries"
    );

    fetchData(fetchURL, fetchOptions);
  }, []);

  return (
    <>
      {Object.keys(loggedUserData).map((element, ind) => {
        return (
          <div className="flex flex-wrap justify-between mb-8">
            <h2 key={ind} className="tracking-wider text-4xl font-800 mx-3">
              {element}
            </h2>
          </div>
        );
      })}
    </>
  );
};

export default Records;
