import React from "react";

const InputLogger = ({
  type,
  name,
  value,
  placeholder,
  width,
  onChange,
  checked,
  required,
}) => {
  return (
    <>
      <input
        className={
          "overflow-auto bg-main9 px-4 py-1 my-auto text-purpleAccent tracking-widest accent-purpleAccent border-solid border-1 border-purpleAccent rounded-md hover:border-2"
        }
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        style={{ width: width }}
        onChange={(event) => onChange(event)}
        checked={checked}
        required={required}
      ></input>
    </>
  );
};

export default InputLogger;
