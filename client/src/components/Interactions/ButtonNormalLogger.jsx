import React from "react";

const ButtonNormalLogger = ({
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
      className="cursor-pointer font-bold tracking-wider text-2xl text-main9 bg-purpleMain w-28 md:w-32 lg:w-36 border-solid border-purpleMain border-2 rounded-2xl shadow-btnLogger hover:text-purpleMain hover:bg-purpleAccent hover:border-purpleMain"
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

export default ButtonNormalLogger;
