import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../Loading/LoadingSpinner";

// START OF COMPONENT ***********************************************************************************************************************
const LogEntry = ({ sectionInput }) => {
  // states -------------------------------------------------------------------------------------------------------
  const { fetchData, isLoading, data, error } = useFetch();
  const [entryInput, setEntryInput] = useState({
    title: "",
    item: "",
    imageUrl: null,
    triggerTag: false,
  });
  // onSubmit => combine entryInput w/ sectionInput i.e., { ...sectionInput, ...entryInput }

  // event handlers -----------------------------------------------------------------------------------------------
  const handleChange = (event) => {
    event.preventDefault();
    setEntryInput((prevEntryInput) => {
      console.log("LogRecord -", "handleChange, before:", entryInput);
      return {
        ...prevEntryInput,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleAdd = () => {};
  const handleRemove = (event) => {
    event.preventDefault();
    console.log("LogEntry -", "Removing", entryInput.title);
    // setShowEntry((prevShowEntry) => {
    //   return !prevShowEntry;
    // });
  };
  const handleSubmit = () => {};

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      <h2>{sectionInput.type}</h2>
      <h2>Entry item</h2>
    </>
  );
};

export default LogEntry;
