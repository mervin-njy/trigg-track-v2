import React from "react";

const ButtonAdmin = ({
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
      className="cursor-pointer font-bold tracking-wider text-2xl text-orangeMain bg-orangeAccent w-28 md:w-32 lg:w-36 border-solid border-orangeAccent border-2 rounded-2xl shadow-btnGeneral hover:text-orangeMain hover:bg-orangeAccent hover:border-orangeMain"
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

export default ButtonAdmin;
