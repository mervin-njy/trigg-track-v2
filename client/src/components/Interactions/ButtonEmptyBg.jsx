import React from "react";

const ButtonEmptyBg = ({
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
      className="cursor-pointer font-oxygen font-normal tracking-wider text-2xl text-greyLightest w-28 md:w-32 lg:w-36 mx-auto"
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

export default ButtonEmptyBg;
