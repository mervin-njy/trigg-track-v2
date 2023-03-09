import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../Loading/LoadingSpinner";
import InputLogger from "../Interactions/InputLogger";
import TextAreaLogger from "../Interactions/TextAreaLogger";

import { MdAddCircle, MdDelete } from "react-icons/md";

// START OF COMPONENT ***********************************************************************************************************************
const LogEntry = ({ id, sectionInput, entryCount, setEntryCount }) => {
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
  
  const handleSubmit = () => {};

  // render component --------------------------------------------------------------------------------------------
  return (
    <>
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
    </>
  );
};

export default LogEntry;
