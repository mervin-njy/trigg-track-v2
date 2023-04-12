import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import ButtonGeneral from "../Interactions/ButtonGeneral";
import RecordSelection from "./RecordSelection";

const Records = ({ loggedUserData }) => {
  // variables ----------------------------------------------------------------------------------------------------

  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // states -------------------------------------------------------------------------------------------------------
  const [searchEntries, setSearchEntries] = useState(false);
  const [entriesOptions, setEntriesOptions] = useState({
    username: loggedUserData.username,
    date: "",
  });
  const { fetchData, isLoading, data, error } = useFetch();

  // event handlers ---------------------------------------------------------------------------------------------

  // effects ------------------------------------------------------------------------------------------------------
  // #1 - http request to get logged entries with input date
  useEffect(() => {
    const controller = new AbortController();
    const fetchURL = `http://127.0.0.1:5001/user/getRecordEntries`;
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${loggedUserData.access}`,
      },
      body: JSON.stringify(entriesOptions),
      signal: controller.signal,
    };

    console.log(
      "Records - ",
      "1st useEffect triggered:",
      "LOGGER - POST /getRecordEntries"
    );

    fetchData(fetchURL, fetchOptions);
    console.log(entriesOptions);
  }, [searchEntries]);

  // #2 - check if data is not null (object is true) => obtain dates to compare w/ current date
  useEffect(() => {
    if (isObject(data)) {
      // // 1. for checking date in records
      // if (data.message === "record exists") {
      //   setDateExists(false);
      // } else if (data.message === "record date not found") {
      //   setDateExists(true);
      // }
      // // 2. for checking if createRecord === successful
      // if (data.message === "record created") {
      //   console.log("record creation success");
      //   setCreateEntries(true);
      // }
    }
  }, [data]);

  // render component ---------------------------------------------------------------------------------------------
  return (
    <div className="w-9/12 mt-40 mb-40 mx-auto">
      <RecordSelection
        setEntriesOptions={setEntriesOptions}
        setSearchEntries={setSearchEntries}
      />

      <div className="flex flex-wrap justify-between mb-8">
        <div className="w-9/20 h-max py-12 px-12 border-solid border-2 rounded-2xl mx-2 my-10">
          <h2 className="tracking-wider text-4xl font-800 mx-3">
            {entriesOptions.date}
          </h2>
          {/* display all record entries */}
          <></>
        </div>
      </div>

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
