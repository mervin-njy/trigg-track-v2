import React from "react";

const FormInput = ({
  type,
  name,
  value,
  reference,
  width,
  onChange,
  checked,
  required,
}) => {
  return (
    <>
      <input
        className={
          "bg-main9 px-4 py-1 accent-main4 border-solid border-2 border-mainLightest rounded-md required:invalid"
        }
        type={type}
        name={name}
        value={value}
        ref={reference}
        style={{ width: width }}
        onChange={(event) => onChange(event)}
        checked={checked}
        required={required}
      ></input>
    </>
  );
};

export default FormInput;
