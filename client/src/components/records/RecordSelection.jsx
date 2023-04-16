import React, { useEffect, useState } from "react";
import ButtonGeneral from "../Interactions/ButtonGeneral";

// TODO:
// 1. get existing recorded dates as select options
// 2. if no options available => queue to log details, or other options

const RecordSelection = ({
  dateEntries,
  setEntriesOptions,
  setSearchEntries,
  setNewRecord,
}) => {
  // variables ----------------------------------------------------------------------------------------------------
  const defaultYear = new Date().toISOString().split("-")[0];

  // functions ----------------------------------------------------------------------------------------------------
  function getDateFromStr(ind) {
    return ind === 2 ? "-" : dateEntries.split("-")[ind]; // ind = 0, 1, 2 => Y, M, D
  }

  function getDaysOfMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  // generates dropdown options of for each select element (YYYY, MM, DD)
  function getDateOptions(lastVal, total, digits) {
    const val = parseInt(lastVal) + 1;
    const options = digits === 4 ? [] : ["-"]; // allow empty option for MM & DD
    for (let i = val - total; i < val; i++) {
      options.push(("0" + i).slice(-digits)); // add 0 at the front to single digits
    }
    return options;
  }

  function checkVal(val) {
    return val && val !== "-" ? "-" + val : "";
  }

  // states -------------------------------------------------------------------------------------------------------

  // event handlers -----------------------------------------------------------------------------------------------
  const handleSelectionChange = (event) => {
    console.log("RecordSelection - selection changed: ", event.target.id);

    // combine YYYY-MM-DD function from parent state - entriesOptions.date || dateEntries
    setEntriesOptions((prevEntriesOptions) => {
      const currDate = prevEntriesOptions.date.split("-");
      const updatedDate =
        (event.target.id === "year" ? event.target.value : currDate[0]) +
        checkVal(
          event.target.id === "month" ? event.target.value : currDate[1]
        ) +
        checkVal(event.target.id === "day" ? event.target.value : currDate[2]);
      console.log(updatedDate);

      return { ...prevEntriesOptions, date: updatedDate };
    });
  };

  const handleViewRecords = (event) => {
    event.preventDefault();
    console.log("RecordSelection - submit selection", dateEntries);
    // prompt rerender of component to display entries from selected date
    setSearchEntries((prevSearchEntries) => !prevSearchEntries);
  };

  const handleAddRecord = (event) => {
    event.preventDefault();
    setNewRecord(true);
  };

  // effects ------------------------------------------------------------------------------------------------------
  // #1 - http request to get all logged dates on mount
  // useEffect(() => {
  //   const controller = new AbortController();
  //   const fetchURL = `http://127.0.0.1:5001/user/getRecordEntries`;
  //   // req.body => username + date
  //   const fetchOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: `Bearer ${loggedUserData.access}`,
  //     },
  //     body: JSON.stringify({ entriesOptions }),
  //     signal: controller.signal,
  //   };

  //   console.log(
  //     "Records - ",
  //     "1st useEffect triggered:",
  //     "LOGGER - POST /getRecordEntries"
  //   );

  //   fetchData(fetchURL, fetchOptions);
  // }, []);

  // render component ---------------------------------------------------------------------------------------------
  return (
    <section>
      <h1 className="tracking-wider text-4xl mx-3 mb-8">
        Select dates to display:
      </h1>
      <div className="flex flex-wrap justify-start mb-14">
        <select
          id="year"
          className="w-2/12 py-2 px-4 border-solid border-2 rounded-lg border-mainDarkest mr-2 bg-main3 text-mainDarkest text-2xl font-semibold tracking-wider"
          onChange={handleSelectionChange}
          value={getDateFromStr(0)}
        >
          {getDateOptions(defaultYear, 10, 4).map((val, ind) => {
            return (
              <option key={ind} value={val}>
                {val}
              </option>
            );
          })}
        </select>

        <select
          id="month"
          className="w-2/12 py-2 px-4 border-solid border-2 rounded-lg border-mainDarkest mr-2 bg-main3 text-mainDarkest text-2xl font-semibold tracking-wider"
          onChange={handleSelectionChange}
          value={getDateFromStr(1)}
        >
          {getDateOptions(12, 12, 2).map((val, ind) => {
            return (
              <option key={ind} value={val}>
                {val}
              </option>
            );
          })}
        </select>

        <select
          id="day"
          className="w-2/12 py-2 px-4 border-solid border-2 rounded-lg border-mainDarkest mr-2 bg-main3 text-mainDarkest text-2xl font-semibold tracking-wider"
          onChange={handleSelectionChange}
          value={getDateFromStr(2)}
        >
          {getDateOptions(
            getDaysOfMonth(getDateFromStr(0), getDateFromStr(1)),
            getDaysOfMonth(getDateFromStr(0), getDateFromStr(1)),
            2
          ).map((val, ind) => {
            return (
              <option key={ind} value={val}>
                {val}
              </option>
            );
          })}
        </select>

        <ButtonGeneral
          displayName={"view records"}
          category={"view"}
          width={"14rem"}
          fontSize={"1.3rem"}
          padding={"0.4rem"}
          margin={"0 0 0 5rem"}
          onClick={handleViewRecords}
        />

        <ButtonGeneral
          displayName={"add record"}
          category={"add"}
          width={"14rem"}
          fontSize={"1.3rem"}
          padding={"0.4rem"}
          margin={"0 0 0 1rem"}
          onClick={handleAddRecord}
        />
      </div>
    </section>
  );
};

export default RecordSelection;
