import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import ButtonGeneral from "../Interactions/ButtonGeneral";

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
  }, [searchEntries]);

  return (
    <div className="w-9/12 mt-40 mb-40 mx-auto">
      <section>
        <h1 className="text-2xl tracking-wider mb-14">
          Select range of dates to display:
        </h1>
        <div className="flex flex-wrap justify-between mb-14">
          <div className="flex flex-wrap justify-start">
            <Select
              id="year"
              className={styles.displaySelect}
              onChange={handleSelectionChange}
              optionValues={date.years}
            />
            <Select
              id="month"
              className={styles.displaySelect}
              onChange={handleSelectionChange}
              optionValues={date.months}
            />
            <Select
              id="month"
              className={styles.displaySelect}
              onChange={handleSelectionChange}
              optionValues={date.months}
            />
          </div>
          <ButtonGeneral
            displayName={"view dates"}
            category={"entries"}
            width={"16rem"}
            fontSize={"1.3rem"}
            padding={"0.4rem"}
            margin={"1rem 0"}
            onClick={handleClick}
          />
        </div>
      </section>

      {Object.keys(loggedUserData).map((element, ind) => {
        return (
          <div className="flex flex-wrap justify-between mb-8">
            <h2 key={ind} className="tracking-wider text-4xl font-800 mx-3">
              {element}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default Records;
