import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import RecordSelection from "./RecordSelection";
import LoadingSpinner from "../Loading/LoadingSpinner";
import RecordCard from "./RecordCard";
import LogRecord from "../logger/LogRecord";

const Records = ({ loggedUserData }) => {
  // variables ----------------------------------------------------------------------------------------------------
  const defaultDate = new Date().toISOString().split("T")[0].slice(0, 7); // get current month

  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // states -------------------------------------------------------------------------------------------------------
  // for searching of data
  const [searchEntries, setSearchEntries] = useState(false);
  const [entriesOptions, setEntriesOptions] = useState({
    username: loggedUserData.username,
    date: defaultDate,
  });

  // for adding record
  const [newRecord, setNewRecord] = useState(false);

  // for data after searching
  const { fetchData, isLoading, data, error } = useFetch();
  const [recordExists, setRecordExists] = useState(false);

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
      "LOGGER - POST /getRecordEntries",
      entriesOptions
    );

    fetchData(fetchURL, fetchOptions);
  }, [searchEntries]);

  // #2 - check if data is not null (object is true) => obtain entries data and pass down to record card for display
  useEffect(() => {
    if (isObject(data)) {
      // 1. for checking entries in records
      if (data.message === "entries exist") {
        setRecordExists(true);
      } else if (data.message === "record entries not found") {
        setRecordExists(false);
      }

      console.log("Records - ", "2nd useEffect - records:", data.records);
    }
  }, [data]);

  // render component ---------------------------------------------------------------------------------------------
  return (
    <div className="w-9/12 mt-40 mb-40 mx-auto">
      {newRecord && (
        <LogRecord
          loggerInfo={loggedUserData}
          recordDate={entriesOptions.date}
        />
      )}

      {!newRecord && (
        <div>
          <RecordSelection
            dateEntries={entriesOptions.date}
            setEntriesOptions={setEntriesOptions}
            setSearchEntries={setSearchEntries}
            setNewRecord={setNewRecord}
          />

          {!recordExists && (
            <h2 className="tracking-widest text-4xl font-medium">
              {`No entries found for ${entriesOptions.date}. Please select another date.`}
            </h2>
          )}
          {recordExists && isObject(data) && (
            <section>
              {/* Display entries if fetched success and loaded */}
              {!isLoading && (
                <div className="flex flex-wrap justify-between mb-8">
                  {/* display all record entries */}
                  <div>
                    {Object.entries(data.records).map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="w-11/12 h-max py-12 px-12 border-solid border-2 rounded-2xl mx-2 my-10"
                        >
                          <RecordCard date={e[0]} entries={e[1]} />
                        </div>
                      );
                    })}
                  </div>
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
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Records;
