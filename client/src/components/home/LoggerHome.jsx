import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

// START OF COMPONENT ***********************************************************************************************************************
const LoggerHome = ({ loggerInfo }) => {
  // variables ----------------------------------------------------------------------------------------------------
  const date = new Date().toISOString().split("T")[0];

  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // states -------------------------------------------------------------------------------------------------------
  // state toggles from question button click => show form input fields when true
  const [showForm, setShowForm] = useState(false);
  // state checks if details on today's date already exists in the database => show question types
  const [todayDone, setTodayDone] = useState(false);
  const { fetchData, isLoading, data, error } = useFetch();

  //   event handlers ---------------------------------------------------------------------------------------------
  const handleOpenForm = () => {
    setShowForm(true);
  };

  // effects ------------------------------------------------------------------------------------------------------
  // #1 - http request to check logged dates
  useEffect(() => {
    console.log("useEffect", JSON.stringify(date));
    const controller = new AbortController();
    const fetchURL = `http://127.0.0.1:5001/logger/getRecordDate`;
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${loggerInfo.access}`,
      },
      body: JSON.stringify({ date }),
      signal: controller.signal,
    };

    console.log(
      "LoggerHome - ",
      "1st useEffect triggered:",
      "LOGGER - POST /getRecordDate"
    );

    fetchData(fetchURL, fetchOptions);
  }, []);

  // #2 - check if data is not null (object is true) => obtain dates to compare w/ current date
  useEffect(() => {
    if (isObject(data) && data.status !== "error") setTodayDone(true);
  }, [data]);

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      {data && todayDone && (
        <div>
          <h2>You have already filled in your records today.</h2>
          {/* <h2>{JSON.stringify(data)}</h2> */}
        </div>
      )}
      {data && !todayDone && <h2>We have not heard from you today yet.</h2>}
    </>
  );
};

export default LoggerHome;
