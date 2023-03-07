import React from "react";

const ButtonGeneral = ({
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
      className="cursor-pointer font-bold tracking-wider text-2xl text-main9 bg-main3 w-28 md:w-32 lg:w-36 border-solid border-main6 border-2 rounded-2xl shadow-btnGeneral hover:text-mainLightest hover:bg-main6 hover:border-mainLightest"
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

export default ButtonGeneral;
