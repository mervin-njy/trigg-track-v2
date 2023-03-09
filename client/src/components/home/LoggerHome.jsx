import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import ButtonNormalLogger from "../Interactions/ButtonNormalLogger";
import ButtonPromptLogger from "../Interactions/ButtonPromptLogger";
import LoadingSpinner from "../Loading/LoadingSpinner";
import LogRecord from "../logger/LogRecord";

// START OF COMPONENT ***********************************************************************************************************************
const LoggerHome = ({ loggerInfo }) => {
  // variables ----------------------------------------------------------------------------------------------------
  const date = new Date().toISOString().split("T")[0];

  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // states -------------------------------------------------------------------------------------------------------
  const [showForm, setShowForm] = useState(false); // toggles between question & form on Click
  const [todayDone, setTodayDone] = useState(false); // toggles display messages & button types
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
      {!isLoading && data && (
        <>
          {!showForm && (
            <header className="show prompts">
              {/* display messages for completion of today's record */}
              {todayDone && (
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
                      Would you like to add more details?
                    </h2>
                  </div>

                  <div className="m-auto">
                    <ButtonNormalLogger
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

              {/* display prompts to complete today's record */}
              {!todayDone && (
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
                    <ButtonPromptLogger
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
            </header>
          )}

          {showForm && <LogRecord loggerInfo={loggerInfo} />}
        </>
      )}

      {/* While fetching, display load spinner */}
      {isLoading && (
        <div className="mt-12 text-center">
          <LoadingSpinner />
        </div>
      )}
      {/* Display error message if fetch has an error */}
      {!isLoading && error && (
        <div className="my-12">
          <h2 className="text-2xl text-center">{error}</h2>
        </div>
      )}
    </>
  );
};

export default LoggerHome;
