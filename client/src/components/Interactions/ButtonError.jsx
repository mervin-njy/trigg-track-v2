import React from "react";

const ButtonError = ({
  displayName,
  category,
  width,
  fontSize,
  padding,
  margin,
  onClick,
}) => {
  return (
    <button
      className="cursor-pointer font-oxygen font-normal tracking-wider text-2xl text-redAccent bg-redMain w-28 md:w-32 lg:w-36 border-solid border-redMain border-2 rounded-2xl shadow-btnGeneral hover:text-redMain hover:bg-redAccent hover:border-redMain"
      name={displayName}
      id={category}
      style={{
        width: width,
        fontSize: fontSize,
        padding: padding,
        margin: margin,
      }}
      onClick={(event) => onClick(event)}
    >
      {displayName}
    </button>
  );
};

export default ButtonError;
