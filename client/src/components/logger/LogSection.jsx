import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../Loading/LoadingSpinner";

import {
  MdDescription,
  MdEdit,
  MdLibraryAddCheck,
  MdClose,
  MdReportProblem,
  MdOutlineAltRoute,
} from "react-icons/md";

// START OF COMPONENT ***********************************************************************************************************************
const LogSection = ({ recordDate, recordType, confirmSubmit }) => {
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
  const { fetchData, isLoading, data, error } = useFetch();
  const [EntryInput, setEntryInput] = useState({
    date: recordDate,
    type: recordType,
    name: "",
    category: "",
    item: "",
    imageUrl: "",
    triggerTag: "",
  });

  // refs ---------------------------------------------------------------------------------------------------------

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

  const handleAdd = () => {};
  const handleRemove = () => {};
  const handleEdit = () => {};
  const handleSubmit = () => {};
  const handleClose = () => {};

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      <div className="flex flex-wrap justify-between">
        {typeIcon(recordType)}
        <h1 className="text-2xl tracking-wider mb-14">{recordType}</h1>
        <MdClose
          size={24}
          className="cursor-pointer my-auto w-1/12 mb-14 hover:font-bold hover:text-main2"
          id="Close"
          onClick={handleClose}
        />
      </div>
    </>
  );
};

export default LogSection;
