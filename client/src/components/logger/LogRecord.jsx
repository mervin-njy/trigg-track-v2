import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

import { MdEdit, MdReportProblem, MdOutlineAltRoute } from "react-icons/md";

import LoadingSpinner from "../Loading/LoadingSpinner";
import ButtonNormalLogger from "../Interactions/ButtonNormalLogger";
import ButtonPromptLogger from "../Interactions/ButtonPromptLogger";
import LogSection from "./LogSection";

// START OF COMPONENT ***********************************************************************************************************************
const LogRecord = ({ loggerInfo, recordDate }) => {
  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // states -------------------------------------------------------------------------------------------------------
  const [showCondition, setShowCondition] = useState(false); // for showing condition form section => TODO: change to {id: bool}
  const [showVariable, setShowVariable] = useState(false); // for showing variable form section => TODO: change to {id: bool}
  const [dateEdit, setDateEdit] = useState(false); // for showing date edit field
  const [dateExists, setDateExists] = useState(false); // for checking if editted date exists in record already
  const [confirmSubmit, setConfirmSubmit] = useState(false); // final check for creating
  const { fetchData, isLoading, data, error } = useFetch();
  const [recordInput, setRecordInput] = useState({
    username: loggerInfo.username,
    date: recordDate,
  });

  // event handlers -----------------------------------------------------------------------------------------------
  const handleChange = (event) => {
    event.preventDefault();
    setRecordInput((prevRecordInput) => {
      console.log("LogRecord -", "handleChange, before:", recordInput);
      return {
        ...prevRecordInput,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleFocus = () => {};
  const handleAddType = () => {};
  const handleAddEntry = (event) => {
    console.log("LogRecord - button clicked: ", event.target.id);
    if (event.target.id === "Condition") setShowCondition(true);
    if (event.target.id === "Variable") setShowVariable(true);
  };
  const handleRemove = () => {};
  const handleEdit = (event) => {
    console.log("LogRecord - button clicked: ", event.target.id);
    if (event.target.id === "Date") setDateEdit(true);
  };
  const handleSubmit = () => {};

  // // effects ------------------------------------------------------------------------------------------------------
  // #1 - http request to check current date shown EXCEPT onMount
  useEffect(() => {
    if (dateEdit) {
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
        "useEffect triggered:",
        "LOGGER - POST /getRecordDate"
      );

      fetchData(fetchURL, fetchOptions);
    }
  }, [recordInput.date]);

  // #2 - check if data is not null (object is true) => obtain dates to compare w/ current date
  useEffect(() => {
    if (isObject(data)) {
      // 1. for checking date in records
      if (data.message === "record exists") {
        setDateExists(false);
      } else if (data.message === "record date not found") {
        setDateExists(true);
      }

      // 2. for checking if createRecord === successful
      if (data.message === "record created") {
        console.log("record creation success");
      }
    }
  }, [data]);

  // #3 - http request - on confirm submit - createRecord + createEntry (multiple) in child
  useEffect(() => {
    if (confirmSubmit) {
      const controller = new AbortController();
      const fetchURL = `http://127.0.0.1:5001/logger/createRecord`;
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${loggerInfo.access}`,
        },
        body: JSON.stringify(recordInput),
        signal: controller.signal,
      };

      console.log(
        "LogRecord - ",
        "useEffect triggered:",
        "LOGGER - PUT /createRecord"
      );

      fetchData(fetchURL, fetchOptions);
    }
  }, [confirmSubmit]); // triggered upon change in date input => create newID & get new ID to add for entries

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      {/* header: date */}
      <header className="flex flex-wrap justify-start mb-8">
        <h2 className="tracking-wider text-4xl font-800 mr-8">Record for:</h2>
        {/* TODO: add state to toggle to form input */}
        <h2 className="tracking-widest text-4xl font-800 mr-8 text-purpleAccent">
          {recordInput.date}
        </h2>
        <MdEdit
          size={30}
          className="cursor-pointer text-main2 hover:text-blueAccent hover:shadow-xl my-auto ml-8"
          id={"Date"}
          onClick={handleEdit}
        />
      </header>

      {/* body: display form sections - Left: conditions; Right: variables */}
      <section className="flex flex-wrap justify-between mx-auto">
        {/* left side: condition */}
        <div className="w-9/20 h-max py-12 px-12 border-solid border-2 rounded-2xl mx-2 my-10 motion-safe:animate-float shadow-xl hover:motion-safe:animate-floatStop hover:shadow-3xl">
          {!showCondition && (
            <>
              <div className="flex flex-wrap">
                <MdReportProblem
                  size={30}
                  className="cursor-pointer text-main2 hover:text-purpleAccent hover:shadow-xl mr-6"
                  id={"Condition"}
                  onFocus={handleFocus}
                />
                <h2 className="text-2xl tracking-widest mb-8">
                  Add condition?
                </h2>
              </div>
              <ButtonPromptLogger
                displayName={"Add new"}
                category={"Condition"}
                width={"10rem"}
                fontSize={"1.2rem"}
                padding={"0.4rem"}
                margin={"1rem 0"}
                onClick={handleAddEntry}
              />
            </>
          )}

          {showCondition && (
            <LogSection
              recordDate={recordInput.date}
              recordType={"Condition"}
              confirmSubmit={confirmSubmit}
            />
          )}
        </div>

        {/* right side: variable */}
        <div className="w-9/20 h-max py-12 px-12 border-solid border-2 rounded-2xl mx-2 my-10 motion-safe:animate-float shadow-xl hover:motion-safe:animate-floatStop hover:shadow-3xl">
          {!showVariable && (
            <>
              <div className="flex flex-wrap">
                <MdOutlineAltRoute
                  size={30}
                  className="cursor-pointer text-main2 hover:text-purpleAccent hover:shadow-xl mr-6"
                  id={"Variable"}
                  onFocus={handleFocus}
                />
                <h2 className="text-2xl tracking-widest mb-8">Add variable?</h2>
              </div>
              <ButtonPromptLogger
                displayName={"Add new"}
                category={"Variable"}
                width={"10rem"}
                fontSize={"1.2rem"}
                padding={"0.4rem"}
                margin={"1rem 0"}
                onClick={handleAddEntry}
              />
            </>
          )}

          {showVariable && (
            <LogSection
              recordDate={recordInput.date}
              recordType={"Variable"}
              confirmSubmit={confirmSubmit}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default LogRecord;
