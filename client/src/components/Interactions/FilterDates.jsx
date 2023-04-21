import React from "react";

const FilterDates = ({ dateEntries, setEntriesOptions }) => {
  // variables ----------------------------------------------------------------------------------------------------
  const defaultYear = new Date().toISOString().split("-")[0];

  // functions ----------------------------------------------------------------------------------------------------
  function getDateFromStr(ind) {
    return dateEntries.split("-")[ind] || "-"; // ind = 0, 1, 2 => Y, M, D, if undefined => "-"
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

  // event handlers -----------------------------------------------------------------------------------------------
  const handleSelectionChange = (event) => {
    console.log("RecordSelection - selection changed: ", event.target.id);

    // combine YYYY-MM-DD function from parent state - entriesOptions.date || dateEntries
    setEntriesOptions((prevEntriesOptions) => {
      const currDate = prevEntriesOptions.date.split("-");
      // const updatedDate = currDate.reduce((acc, val, ind) => {
      //   acc += checkVal(event.target.id === ind ? event.target.value : val);
      //   return acc;
      // }, "");
      const updatedDate =
        (event.target.id === "0" ? event.target.value : currDate[0]) +
        checkVal(event.target.id === "1" ? event.target.value : currDate[1]) +
        checkVal(event.target.id === "2" ? event.target.value : currDate[2]);
      console.log(updatedDate);

      return { ...prevEntriesOptions, date: updatedDate };
    });
  };

  // render component ---------------------------------------------------------------------------------------------
  return (
    <div className="w-6/12">
      {/* YEAR OPTION */}
      <select
        id={0}
        className="w-3/10 py-2 px-4 border-solid border-2 rounded-lg border-mainDarkest mr-2 bg-main3 text-mainDarkest text-2xl font-semibold tracking-wider"
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

      {/* MONTH OPTION */}
      <select
        id={1}
        className="w-3/10 py-2 px-4 border-solid border-2 rounded-lg border-mainDarkest mr-2 bg-main3 text-mainDarkest text-2xl font-semibold tracking-wider"
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

      {/* DAY OPTION */}
      <select
        id={2}
        className="w-3/10 py-2 px-4 border-solid border-2 rounded-lg border-mainDarkest mr-2 bg-main3 text-mainDarkest text-2xl font-semibold tracking-wider"
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
    </div>
  );
};

export default FilterDates;
