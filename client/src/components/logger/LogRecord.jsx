import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../Loading/LoadingSpinner";

import ButtonNormalLogger from "../Interactions/ButtonNormalLogger";
import ButtonPromptLogger from "../Interactions/ButtonPromptLogger";

// START OF COMPONENT ***********************************************************************************************************************
const LogRecord = ({ loggerInfo, recordDate }) => {
  // states -------------------------------------------------------------------------------------------------------
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

  const handleAdd = () => {};
  const handleRemove = () => {};
  const handleEdit = () => {};
  const handleSubmit = () => {};

  // render component --------------------------------------------------------------------------------------------
  return (
    <div>
      <h2>Displaying form</h2>
      <h2>{recordInput.username}</h2>
      <h2>{recordInput.date}</h2>
    </div>
  );
};

export default LogRecord;
