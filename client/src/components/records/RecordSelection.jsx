import React, { useEffect, useState } from "react";
import ButtonGeneral from "../Interactions/ButtonGeneral";

// TODO:
// 1. get existing recorded dates as select options
// 2. if no options available => queue to log details, or other options

const RecordSelection = ({ setEntriesOptions, setSearchEntries }) => {
  // variables ----------------------------------------------------------------------------------------------------
  const defaultDate = new Date().toISOString().split("T")[0].slice(0, 7); // get current month
  const defaultYear = defaultDate.split("-")[0];
  const defaultMonth = defaultDate.split("-")[1];
  const currentMonthDays = getDaysOfMonth(defaultYear, defaultMonth);

  // functions ----------------------------------------------------------------------------------------------------
  function getDaysOfMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  // generates dropdown options of for each select element (YYYY, MM, DD)
  function getDateOptions(lastVal, total, digits) {
    const options = digits === 4 ? [] : ["-"]; // allow empty option for MM & DD
    for (let i = lastVal - total; i < lastVal; i++) {
      options.push(("0" + i).slice(-digits)); // add 0 at the front to single digits
    }
    return options;
  }

  function checkVal(val) {
    return val !== "-" ? "-" + val : "";
  }

  // states -------------------------------------------------------------------------------------------------------
  const [selectedDate, setSelectedDate] = useState({
    year: defaultYear,
    month: defaultMonth,
    day: "-",
  });

  // event handlers ---------------------------------------------------------------------------------------------
  const handleSelectionChange = (event) => {
    console.log("RecordSelection - selection changed: ", event.target.id);
    console.log(selectedDate, currentMonthDays);
    setSelectedDate((prevSelectedDate) => {
      return { ...prevSelectedDate, [event.target.id]: event.target.value };
    });
  };

  const handleClick = (event) => {
    console.log("RecordSelection - submit selection", selectedDate);
    // combine YYYY-MM-DD function from selectedDate state
    const submitDate =
      selectedDate.year +
      checkVal(selectedDate.month) +
      checkVal(selectedDate.day);

    setEntriesOptions((prevEntriesOptions) => {
      return { ...prevEntriesOptions, date: submitDate };
    });
    setSearchEntries((prevSearchEntries) => !prevSearchEntries);
  };

  // effects ------------------------------------------------------------------------------------------------------
  // #1 - http request to get all logged dates on mount
  //   useEffect(() => {
  //     const controller = new AbortController();
  //     const fetchURL = `http://127.0.0.1:5001/user/getRecordEntries`;
  //     // req.body => username + date
  //     const fetchOptions = {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${loggedUserData.access}`,
  //       },
  //       body: JSON.stringify({ entriesOptions }),
  //       signal: controller.signal,
  //     };

  //     console.log(
  //       "Records - ",
  //       "1st useEffect triggered:",
  //       "LOGGER - POST /getRecordEntries"
  //     );

  //     fetchData(fetchURL, fetchOptions);
  //   }, []);

  // render component ---------------------------------------------------------------------------------------------
  return (
    <section>
      <h1 className="text-3xl tracking-wider mb-8">
        Select range of dates to display:
      </h1>
      <div className="flex flex-wrap justify-start mb-14">
        <select
          id="year"
          className="w-2/12 py-2 px-4 border-solid border-2 rounded-lg border-mainDarkest mr-2 bg-main3 text-mainDarkest text-2xl font-semibold tracking-wider"
          onChange={handleSelectionChange}
          value={selectedDate.year}
        >
          {getDateOptions(defaultYear, 10, 4).map((val, ind) => {
            return (
              <option key={ind} value={val}>
                {val}
              </option>
            );
          })}
          <option selected key={defaultYear} value={defaultYear}>
            {defaultYear}
          </option>
        </select>

        <select
          id="month"
          className="w-2/12 py-2 px-4 border-solid border-2 rounded-lg border-mainDarkest mr-2 bg-main3 text-mainDarkest text-2xl font-semibold tracking-wider"
          onChange={handleSelectionChange}
          value={selectedDate.month}
        >
          {getDateOptions(12 + 1, 12, 2).map((val, ind) => {
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
          value={selectedDate.day}
        >
          {getDateOptions(
            getDaysOfMonth(selectedDate.year, selectedDate.month) + 1,
            getDaysOfMonth(selectedDate.year, selectedDate.month),
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
          displayName={"view dates"}
          category={"entries"}
          width={"14rem"}
          fontSize={"1.3rem"}
          padding={"0.4rem"}
          margin={"0 5rem"}
          onClick={handleClick}
        />
      </div>
    </section>
  );
};

export default RecordSelection;