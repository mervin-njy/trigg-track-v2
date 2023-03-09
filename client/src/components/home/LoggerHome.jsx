import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import ButtonLogger from "../Interactions/ButtonLogger";

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
  const handleOpenForm = (event) => {
    console.log(event.target.name);
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
        <div className="flex flex-wrap justify-between">
          <div className="w-8/12">
            <h2 className="text-mainLightest text-3xl tracking-widest mr-auto">
              You{" "}
              <span className="text-greenAccent motion-safe:animate-successText">
                have already
              </span>{" "}
              filled in your records today.
            </h2>
            <h2 className="text-mainLightest text-3xl tracking-widest mt-8 mr-auto">
              Would you like to log your record for today?
            </h2>
          </div>
        </div>
      )}

      {data && !todayDone && (
        <div className="flex flex-wrap justify-between">
          <div className="w-8/12">
            <h2 className="text-mainLightest text-3xl tracking-widest mr-auto">
              We{" "}
              <span className="text-orangeMain font-bold motion-safe:animate-noSuccessText">
                have not
              </span>{" "}
              heard from you today yet.
            </h2>
            <h2 className="text-mainLightest text-3xl tracking-widest mt-8 mr-auto">
              Would you like to log your record for today?
            </h2>
          </div>

          <div className="m-auto">
            <ButtonLogger
              displayName={"Record"}
              category={"Records"}
              width={"10rem"}
              fontSize={"1.3rem"}
              padding={"0.4rem"}
              margin={"1rem 0"}
              onClick={handleOpenForm}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LoggerHome;
