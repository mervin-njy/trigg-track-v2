import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";

const LogSection = ({ recordID }) => {
  // take record date from props
  // states -------------------------------------------------------------------------------------------------------
  const { fetchData, isLoading, data, error } = useFetch();
  const [EntryInput, setEntryInput] = useState({
    date: recordID,
    type: "Condition",
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

  // render component --------------------------------------------------------------------------------------------
  return (
    <div>
      <h2>Displaying section</h2>
    </div>
  );
};

export default LogSection;
