import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../Loading/LoadingSpinner";
import InputLogger from "../Interactions/InputLogger";
import TextAreaLogger from "../Interactions/TextAreaLogger";

import { MdAddCircle, MdDelete } from "react-icons/md";

// START OF COMPONENT ***********************************************************************************************************************
const LogEntry = ({
  id,
  access,
  sectionInput,
  entryCount,
  setEntryCount,
  confirmSubmit,
  createEntries,
  checkEmptyFields,
  setFetchStatus,
}) => {
  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // states -------------------------------------------------------------------------------------------------------
  const { fetchData, isLoading, data, error } = useFetch();
  const [entryInput, setEntryInput] = useState({
    title: "",
    item: "",
    imageUrl: null,
    triggerTag: false,
  }); // onSubmit => combine entryInput w/ sectionInput i.e., { ...sectionInput, ...entryInput }
  const [displayFields, setDisplayFields] = useState(true);

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

  const handleAdd = () => {
    console.log("LogEntry -", "Adding new entry");
    console.log("current count:", entryCount.length);
    console.log("current entries", entryCount);
    if (
      entryInput.title !== "" &&
      entryInput.item !== "" &&
      sectionInput.name !== "" &&
      sectionInput.category !== ""
    ) {
      setEntryCount((prevEntryCount) => {
        return [...prevEntryCount, (id += 1)];
      });
    } else {
      alert("Don't be greedy, please fill entries before adding new ones.");
    }
  };

  const handleRemove = () => {
    console.log("LogEntry -", "Removing", entryInput.title);
    console.log("current count:", entryCount.length);
    console.log("current entries", entryCount);
    if (entryCount.length >= 1) {
      setEntryCount((prevEntryCount) => {
        return prevEntryCount.filter((item) => {
          return item !== id;
        });
      });
    }
  };

  // effects ------------------------------------------------------------------------------------------------------
  // #1 - http request - on confirm submit - createEntry (multiple) here + createRecord in parent
  useEffect(() => {
    if (createEntries) {
      const controller = new AbortController();
      const fetchURL = `http://127.0.0.1:5001/logger/createEntry`;
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({ ...sectionInput, ...entryInput }),
        signal: controller.signal,
      };

      console.log(
        "LogEntry - ",
        "useEffect triggered:",
        "LOGGER - PUT /createEntry"
      );

      fetchData(fetchURL, fetchOptions);
    }
  }, [createEntries]); // triggered upon change in date input => creates a newID that can be linked with date for adding entries

  // #2 - check if data is not null (object is true) => obtain dates to compare w/ current date
  useEffect(() => {
    if (isObject(data)) {
      // 1. for checking date in records
      if (data.message === "record entry created") {
        setFetchStatus(true);
        setDisplayFields(false);
      }
    }
  }, [data]);

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
      {displayFields && (
        <div className="flex flex-wrap justify-between mt-4">
          <InputLogger
            type="text"
            name="title"
            value={entryInput.title}
            placeholder={"title"}
            width={"20%"}
            onChange={handleChange}
            required={true}
          />
          <TextAreaLogger
            type="text"
            name="item"
            value={entryInput.item}
            placeholder={"item"}
            width={"60%"}
            onChange={handleChange}
            required={true}
          />
          <MdDelete
            size={30}
            className="cursor-pointer text-main2 hover:text-orangeMain hover:shadow-xl"
            id={"Remove"}
            onClick={handleRemove}
          />
          <MdAddCircle
            size={30}
            className="cursor-pointer text-main2 hover:text-greenMain hover:shadow-xl"
            id={"Add"}
            onClick={handleAdd}
          />
        </div>
      )}

      {!displayFields && (
        <div className="flex flex-wrap justify-between mt-4 motion-safe:animate-successText">
          <h3 className="w-3/10` text-md tracking-widest my-auto">
            {entryInput.title}
          </h3>
          <h3 className="w-7/10 text-md tracking-widest my-auto">
            {entryInput.item}
          </h3>
        </div>
      )}
    </>
  );
};

export default LogEntry;
