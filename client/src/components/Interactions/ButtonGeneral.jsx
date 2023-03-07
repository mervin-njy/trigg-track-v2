import React from "react";

const ButtonGeneral = ({
  displayName,
  category,
  width,
  padding,
  margin,
  onClick,
}) => {
  return (
    <button
      className="cursor-pointer font-oxygen font-normal tracking-wider text-2xl text-white bg-yellowMain w-28 md:w-32 lg:w-36 border-solid border-white border-2 rounded-2xl mx-auto hover:text-yellowMain hover:bg-yellowAccent hover:border-yellowMain"
      name={displayName}
      id={category}
      style={{
        width: width,
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
