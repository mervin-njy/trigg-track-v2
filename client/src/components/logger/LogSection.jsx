import React, { useState, useEffect } from "react";
import InputLogger from "../Interactions/InputLogger";
import LogEntry from "./LogEntry";

import { MdLibraryAddCheck, MdAddCircle, MdDelete } from "react-icons/md";

// START OF COMPONENT ***********************************************************************************************************************
const LogSection = ({
  sectionId,
  recordDate,
  recordType,
  confirmSubmit,
  setSectionCount,
}) => {
  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // states -------------------------------------------------------------------------------------------------------
  const [sectionInput, setSectionInput] = useState({
    date: recordDate,
    type: recordType,
    name: "",
    category: "",
  });
  const [entryCount, setEntryCount] = useState([0]);

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
  const handleSubmit = () => {};

  // const handleEdit = () => {};
  // const handleClose = (event) => {
  //   event.preventDefault();
  //   console.log("LogSection -", "Closing", recordType);
  //   // setShowType((prevShowType) => {
  //   //   return !prevShowType;
  //   // });
  // };

  // effects ------------------------------------------------------------------------------------------------------

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      {/* header to display type is in parent */}
      <div className="pb-4 border-t-4" />

      {/* input fields start here */}
      <section className=" motion-safe:animate-fadeIn">
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

        {/* #3 multientry */}
        <div className="py-3 border-b-2 border-purpleMain border-opacity-50" />

        {/* # mapped entry item*/}
        {entryCount.map((item) => {
          return (
            <LogEntry
              id={item}
              sectionInput={sectionInput}
              entryCount={entryCount}
              setEntryCount={setEntryCount}
            />
          );
        })}

        {/* #4 confirmation + add/delete options */}
        <div className="py-2 border-b-2 border-purpleMain border-opacity-50" />

        {lastSection && (
          <div className="flex flex-wrap justify-between mt-9">
            <MdLibraryAddCheck
              size={35}
              className="cursor-pointer text-greenAccent hover:text-greenMain hover:shadow-xl"
              id={"Submit"}
              onClick={handleSubmit}
            />
            <div className="flex flex-wrap">
              <MdDelete
                size={35}
                className="cursor-pointer text-purpleAccent hover:text-orangeMain hover:shadow-xl mr-4"
                id={"Remove"}
                onClick={handleRemove}
              />
              <MdAddCircle
                size={35}
                className="cursor-pointer text-purpleAccent hover:text-greenMain hover:shadow-xl"
                id={"Add"}
                onClick={handleAdd}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default LogSection;
