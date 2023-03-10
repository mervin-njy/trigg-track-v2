import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  MdEdit,
  MdReportProblem,
  MdOutlineAltRoute,
  MdClose,
  MdAddCircle,
  MdDelete,
  MdLibraryAddCheck,
} from "react-icons/md";

import LoadingSpinner from "../Loading/LoadingSpinner";
import ButtonPromptLogger from "../Interactions/ButtonPromptLogger";
import LogSection from "./LogSection";

// START OF COMPONENT ***********************************************************************************************************************
const LogRecord = ({ loggerInfo, recordDate }) => {
  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  function typeIcon(type) {
    if (type === "Condition") {
      return (
        <MdReportProblem
          size={30}
          className="cursor-pointer text-main2 hover:text-purpleAccent hover:shadow-xl mr-6"
          id={"Condition"}
        />
      );
    } else {
      return (
        <MdOutlineAltRoute
          size={30}
          className="cursor-pointer text-main2 hover:text-purpleAccent hover:shadow-xl mr-6"
          id={"Variable"}
        />
      );
    }
  }

  // states -------------------------------------------------------------------------------------------------------
  const [showCondition, setShowCondition] = useState(false); // for showing condition form section => TODO: change to {id: bool}
  const [showVariable, setShowVariable] = useState(false); // for showing variable form section => TODO: change to {id: bool}
  const [dateEdit, setDateEdit] = useState(false); // for showing date edit field
  const [dateExists, setDateExists] = useState(false); // for checking if editted date exists in record already
  const [confirmSubmit, setConfirmSubmit] = useState(false); // for createRecords
  const [createEntries, setCreateEntries] = useState(false); // for createEntry(s)
  const [fetchStatus, setFetchStatus] = useState(false); // final check for creating
  const { fetchData, isLoading, data, error } = useFetch();
  const [recordInput, setRecordInput] = useState({
    username: loggerInfo.username,
    date: recordDate,
  });
  const [conditionCount, setConditionCount] = useState([0]);
  const [variableCount, setVariableCount] = useState([0]);

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

  const handleAddEntry = (event) => {
    console.log("LogRecord - button clicked: ", event.target.id);
    if (event.target.id === "Condition") setShowCondition(true);
    if (event.target.id === "Variable") setShowVariable(true);
  };

  const handleAddType = (event) => {
    event.preventDefault();
    console.log("LogRecord -", "Adding new section");
    if (event.target.id === "NextCondition") {
      console.log("current conditions:", conditionCount);
      setConditionCount((prevConditionCount) => {
        return [...prevConditionCount, conditionCount.length];
      });
    }

    if (event.target.id === "NextVariable") {
      console.log("current variables:", variableCount);
      setVariableCount((prevVariableCount) => {
        return [...prevVariableCount, variableCount.length];
      });
    }
  };

  const handleRemove = (event) => {
    event.preventDefault();
    console.log("LogRecord -", "Removing section");

    if (event.target.id === "NextCondition") {
      console.log("current array:", conditionCount);
      if (conditionCount.length >= 1) {
        console.log("current condition count:", conditionCount.length);
        setConditionCount((prevConditionCount) => {
          return prevConditionCount.filter((item) => {
            console.log(item);
            return item !== conditionCount.length - 1;
          });
        });
      } else {
        alert("No more to remove!");
      }
    }

    if (event.target.id === "NextVariable") {
      console.log("current array:", variableCount);
      if (variableCount.length >= 1) {
        console.log("current variable count:", variableCount.length);
        setVariableCount((prevVariableCount) => {
          return prevVariableCount.filter((item) => {
            console.log(item);
            return item !== variableCount.length - 1;
          });
        });
      } else {
        alert("No more to remove!");
      }
    }
  };

  const handleSubmit = (event) => {
    console.log("LogRecord - submitting records w/", event.target.id);
    setConfirmSubmit(true);
  };

  const handleClose = (event) => {
    event.preventDefault();
    console.log("LogRecord -", "Closing", event.target.id);

    if (event.target.id === "Condition") {
      setShowCondition((prevShowCondition) => {
        return !prevShowCondition;
      });
    }

    if (event.target.id === "Variable") {
      setShowVariable((prevShowVariable) => {
        return !prevShowVariable;
      });
    }
  };

  const handleEdit = (event) => {
    console.log("LogRecord - button clicked: ", event.target.id);
    if (event.target.id === "Date") setDateEdit(true);
  };

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
        setCreateEntries(true);
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
  }, [confirmSubmit]); // triggered upon change in date input => creates a newID that can be linked with date for adding entries

  useEffect(() => {
    if (createEntries) {
      if (fetchStatus) {
        toast(`Record creation succesful!`, {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
          autoClose: 10000,
          hideProgressBar: true,
          className:
            "bg-main7 text-greenAccent border-2 border-main3 rounded-4",
        });
      } else {
        toast(`Record creation is not successful.`, {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
          autoClose: 10000,
          hideProgressBar: true,
          className: "bg-main7 text-orangeMain border-2 border-main3 rounded-4",
        });
      }
    }
  }, [fetchStatus]);

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      <ToastContainer />
      {/* header: date */}
      <header className="flex flex-wrap justify-between">
        <div className="flex flex-wrap justify-start mb-8">
          <h2 className="tracking-wider text-4xl font-800 mx-3">Record for:</h2>
          {/* TODO: add state to toggle to form input */}
          <h2 className="tracking-widest text-4xl font-800 ml-12 text-purpleAccent">
            {recordInput.date}
          </h2>
          <MdEdit
            size={30}
            className="cursor-pointer ml-16 text-main2 hover:text-blueAccent hover:shadow-xl my-auto"
            id={"Date"}
            onClick={handleEdit}
          />
          <MdLibraryAddCheck
            size={35}
            className="cursor-pointer my-auto ml-4 text-greenAccent hover:text-greenMain hover:shadow-xl"
            id={"All Records"}
            onClick={handleSubmit}
          />
        </div>
      </header>

      {/* body: display form sections - Left: conditions; Right: variables */}
      <section className="flex flex-wrap justify-between mx-auto">
        {/* left side: condition */}
        <div className="w-9/20 h-max py-12 px-12 border-solid border-2 rounded-2xl mx-2 my-10 motion-safe:animate-float shadow-xl hover:motion-safe:animate-floatStop hover:border-purpleAccent hover:shadow-3xl">
          {!showCondition && (
            <>
              <div className="flex flex-wrap">
                {typeIcon("Condition")}
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
            <>
              {/* header to display type */}
              <div className="flex flex-wrap justify-between">
                <div className="flex flex-wrap justify-start mb-4">
                  {typeIcon("Condition")}
                  <h1 className="ml-2 text-2xl tracking-wider">Condition</h1>
                </div>
                <MdClose
                  size={24}
                  className="cursor-pointer my-auto w-1/12 mb-6 hover:font-bold hover:text-main2"
                  id="Condition"
                  onClick={handleClose}
                />
              </div>

              {/* # mapped sections for each type */}
              {conditionCount.map((item) => {
                return (
                  <LogSection
                    access={loggerInfo.access}
                    recordDate={recordInput.date}
                    recordType={"Condition"}
                    createEntries={createEntries}
                    setFetchStatus={setFetchStatus}
                  />
                );
              })}

              <div className="flex flex-wrap justify-end mt-9">
                <MdDelete
                  size={35}
                  className="cursor-pointer text-purpleAccent hover:text-orangeMain hover:shadow-xl mr-4"
                  id={"NextCondition"}
                  onClick={handleRemove}
                />
                <MdAddCircle
                  size={35}
                  className="cursor-pointer text-purpleAccent hover:text-greenMain hover:shadow-xl"
                  id={"NextCondition"}
                  onClick={handleAddType}
                />
              </div>
            </>
          )}
        </div>

        {/* right side: variable */}
        <div className="w-9/20 h-max py-12 px-12 border-solid border-2 rounded-2xl mx-2 my-10 motion-safe:animate-float shadow-xl hover:motion-safe:animate-floatStop hover:border-purpleAccent hover:shadow-3xl">
          {!showVariable && (
            <>
              <div className="flex flex-wrap">
                {typeIcon("Variable")}
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
            <>
              {/* header to display type */}
              <div className="flex flex-wrap justify-between">
                <div className="flex flex-wrap justify-start mb-4">
                  {typeIcon("Variable")}
                  <h1 className="ml-2 text-2xl tracking-wider">Variable</h1>
                </div>
                <MdClose
                  size={24}
                  className="cursor-pointer my-auto w-1/12 mb-6 hover:font-bold hover:text-main2"
                  id="Variable"
                  onClick={handleClose}
                />
              </div>

              {/* # mapped sections for each type */}
              {variableCount.map((item) => {
                return (
                  <LogSection
                    access={loggerInfo.access}
                    recordDate={recordInput.date}
                    recordType={"Variable"}
                    createEntries={createEntries}
                    setFetchStatus={setFetchStatus}
                  />
                );
              })}

              <div className="flex flex-wrap justify-end mt-9">
                <MdDelete
                  size={35}
                  className="cursor-pointer text-purpleAccent hover:text-orangeMain hover:shadow-xl mr-4"
                  id={"NextVariable"}
                  onClick={handleRemove}
                />
                <MdAddCircle
                  size={35}
                  className="cursor-pointer text-purpleAccent hover:text-greenMain hover:shadow-xl"
                  id={"NextVariable"}
                  onClick={handleAddType}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default LogRecord;
