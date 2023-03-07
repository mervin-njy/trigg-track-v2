import React from "react";

const InputGeneral = ({
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
          "overflow-auto bg-main9 px-4 py-1 text-main2 tracking-widest accent-main4 border-solid border-2 border-main2 rounded-md"
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

export default InputGeneral;
