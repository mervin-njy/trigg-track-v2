import React from "react";

const TextAreaLogger = ({
  type,
  name,
  value,
  placeholder,
  margin,
  width,
  onChange,
  checked,
  required,
}) => {
  return (
    <>
      <textarea
        className={
          "overflow-auto align-middle bg-main9 px-4 py-1 h-9 text-purpleAccent tracking-widest accent-purpleAccent border-solid border-1 border-purpleAccent rounded-md hover:border-2"
        }
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        style={{ margin: margin, width: width }}
        onChange={(event) => onChange(event)}
        checked={checked}
        required={required}
      ></textarea>
    </>
  );
};

export default TextAreaLogger;
