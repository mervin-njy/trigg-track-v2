import React from "react";

const FormInput = ({
  className,
  type,
  name,
  value,
  reference,
  onValueChange,
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
        onChange={(event) => onValueChange(event)}
        required={required}
      ></input>
    </>
  );
};

export default FormInput;
