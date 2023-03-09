import React, { useState } from "react";
import InputLogger from "../Interactions/InputLogger";
import LogEntry from "./LogEntry";

import {
  MdDescription,
  MdEdit,
  MdLibraryAddCheck,
  MdAddCircle,
  MdClose,
  MdReportProblem,
  MdOutlineAltRoute,
} from "react-icons/md";

// START OF COMPONENT ***********************************************************************************************************************
const LogSection = ({ recordDate, recordType, confirmSubmit, setShowType }) => {
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
  const [sectionInput, setSectionInput] = useState({
    date: recordDate,
    type: recordType,
    name: "",
    category: "",
  });
  const [entryCount, setEntryCount] = useState(1);

  // event handlers -----------------------------------------------------------------------------------------------
  const handleChange = (event) => {
    event.preventDefault();
    setSectionInput((prevSectionInput) => {
      console.log("LogRecord -", "handleChange, before:", sectionInput);
      return {
        ...prevSectionInput,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleAdd = () => {};
  const handleRemove = () => {};
  const handleEdit = () => {};
  const handleSubmit = () => {};
  const handleClose = (event) => {
    event.preventDefault();
    console.log("LogSection -", "Closing", recordType);
    setShowType((prevShowType) => {
      return !prevShowType;
    });
  };

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      {/* header to display type */}
      <header className="flex flex-wrap justify-between">
        <div className="flex flex-wrap justify-start mb-8">
          {typeIcon(recordType)}
          <h1 className="text-2xl tracking-wider">{recordType}</h1>
        </div>
        <MdClose
          size={24}
          className="cursor-pointer my-auto w-1/12 mb-8 hover:font-bold hover:text-main2"
          id="Close"
          onClick={handleClose}
        />
      </header>

      <div className="pb-4 border-t-4" />

      {/* input fields start here */}
      <section>
        {/* #1 name */}
        <div className="flex flex-wrap justify-between mt-6">
          <div className="flex flex-wrap justify-start w-3/12">
            <h4 className="text-xl tracking-widest my-auto">name:</h4>
          </div>
          <InputLogger
            type="text"
            name="name"
            value={sectionInput.name}
            width={"70%"}
            onChange={handleChange}
            required={true}
          />
        </div>

        {/* #2 category */}
        <div className="flex flex-wrap justify-between mt-4">
          <div className="flex flex-wrap justify-start w-3/12">
            <h4 className="text-xl tracking-widest my-auto">category:</h4>
          </div>
          <InputLogger
            type="text"
            name="category"
            value={sectionInput.category}
            width={"70%"}
            onChange={handleChange}
            required={true}
          />
        </div>

        {/* #3 headers for each entry */}
        {/* <div className="flex flex-wrap justify-between mt-4">
          <div className="flex flex-wrap justify-center w-3/12">
            <h4 className="text-xl tracking-widest my-auto">title:</h4>
          </div>
          <div className="flex flex-wrap justify-center w-7/12">
            <h4 className="text-xl tracking-widest my-auto">item:</h4>
          </div>
        </div> */}

        <div className="py-3 border-b-1 border-purpleMain border-opacity-50" />

        {/* add id to LogEntry + convert to function to count number of times */}
        <LogEntry sectionInput={sectionInput} />
      </section>
    </>
  );
};

export default LogSection;
