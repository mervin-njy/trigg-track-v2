import React from "react";

const ButtonEmptyBg = ({
  displayName,
  category,
  width,
  fontSize,
  textDecoration,
  padding,
  margin,
  onClick,
}) => {
  return (
    <button
      className="cursor-pointer font-oxygen font-normal tracking-wider text-2xl text-left text-greyLightest w-28 md:w-32 lg:w-36"
      name={displayName}
      id={category}
      style={{
        width: width,
        fontSize: fontSize,
        textDecoration: textDecoration,
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
