import React from "react";

const FormInput = ({ type, name, value, reference, onChange, required }) => {
  return (
    <>
      <input
        className={
          "w-8/12 bg-main9 px-4 py-1 border-solid border-2 border-mainLightest rounded-md"
        }
        type={type}
        name={name}
        value={value}
        ref={reference}
        onChange={(event) => onChange(event)}
        required={required}
      ></input>
    </>
  );
};

export default FormInput;
