import React from "react";

const FormInput = ({
  type,
  name,
  value,
  reference,
  width,
  onChange,
  required,
}) => {
  return (
    <>
      <input
        className={
          "bg-main9 px-4 py-1 border-solid border-2 border-mainLightest rounded-md"
        }
        type={type}
        name={name}
        value={value}
        ref={reference}
        style={{ width: width }}
        onChange={(event) => onChange(event)}
        required={required}
      ></input>
    </>
  );
};

export default FormInput;
