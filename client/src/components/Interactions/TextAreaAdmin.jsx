import React from "react";

const TextAreaAdmin = ({
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
      <textarea
        className={
          "overflow-auto bg-main9 px-4 py-1 text-orangeMain tracking-widest accent-orangeMain border-solid border-2 border-orangeMain rounded-md"
        }
        type={type}
        name={name}
        value={value}
        ref={reference}
        style={{ width: width }}
        onChange={(event) => onChange(event)}
        checked={checked}
        required={required}
      ></textarea>
    </>
  );
};

export default TextAreaAdmin;
