import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import ButtonGeneral from "../Interactions/ButtonGeneral";
import RecordSelection from "./RecordSelection";

const Records = ({ loggedUserData }) => {
  // variables ----------------------------------------------------------------------------------------------------
  const defaultDate = new Date().toISOString().split("T")[0].slice(0, 7); // get current month

  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // states -------------------------------------------------------------------------------------------------------
  const [searchEntries, setSearchEntries] = useState(false);
  const [entriesOptions, setEntriesOptions] = useState({
    username: loggedUserData.username,
    date: defaultDate,
  });
  const { fetchData, isLoading, data, error } = useFetch();

  // event handlers ---------------------------------------------------------------------------------------------

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

    // fetchData(fetchURL, fetchOptions);
    console.log("fetching data");
  }, [searchEntries]);

  // render component ---------------------------------------------------------------------------------------------
  return (
    <div className="w-9/12 mt-40 mb-40 mx-auto">
      <RecordSelection
        entriesOptions={entriesOptions}
        setEntriesOptions={setEntriesOptions}
        setSearchEntries={setSearchEntries}
      />

      {searchEntries && (
        <h2 className="tracking-wider text-4xl font-800 mx-3">
          {entriesOptions.date}
        </h2>
      )}

      {Object.keys(loggedUserData).map((element, ind) => {
        return (
          <div key={ind} className="flex flex-wrap justify-between mb-8">
            <h2 className="tracking-wider text-2xl font-800 mx-3">{element}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Records;
