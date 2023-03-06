import React from "react";

const FormInput = ({
  className,
  type,
  name,
  value,
  reference,
  onChange,
  required,
}) => {
  return (
    <>
      <input
        className={className}
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
