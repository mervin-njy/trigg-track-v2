import React, { useState } from "react";
import ButtonGeneral from "../Interactions/ButtonGeneral";

const RecordSelection = ({
  entriesOptions,
  setEntriesOptions,
  setSearchEntries,
}) => {
  // event handlers ---------------------------------------------------------------------------------------------
  const handleSelectionChange = (event) => {
    console.log("RecordSelection - selection changed: ", event.target.id);
    // setEntriesOptions(true); => combine YYYY-MM-DD for entriesOptions.date
  };

  const handleClick = (event) => {
    console.log("RecordSelection - submit selection", event.target);
  };
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
        >
          <option value="2023">{"2023"}</option>
          <option value="2022">{"2022"}</option>
        </select>
        <select
          id="month"
          className="w-2/12 py-2 px-4 border-solid border-2 rounded-lg border-mainDarkest mr-2 bg-main3 text-mainDarkest text-2xl font-semibold tracking-wider"
          onChange={handleSelectionChange}
        >
          <option value="01">{"01"}</option>
          <option value="02">{"02"}</option>
        </select>
        <select
          id="day"
          className="w-2/12 py-2 px-4 border-solid border-2 rounded-lg border-mainDarkest mr-2 bg-main3 text-mainDarkest text-2xl font-semibold tracking-wider"
          onChange={handleSelectionChange}
        >
          <option value="01">{"01"}</option>
          <option value="02">{"02"}</option>
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
