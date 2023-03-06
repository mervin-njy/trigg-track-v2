import React from "react";

const ButtonSubmit = ({
  displayName,
  category,
  width,
  padding,
  margin,
  colourBackground,
  colourText,
  onClick,
  //   autofocus,
}) => {
  return (
    <button
      className="cursor-pointer font-normal tracking-wider w-28 md:w-32 lg:w-36 border-solid border-3 rounded-sm mx-auto text-sm hover:text-xs"
      name={category}
      id={displayName}
      style={{
        width: width,
        padding: padding,
        margin: margin,
        color: colourText,
        background: colourBackground,
      }}
      onClick={(event) => onClick(event)}
    >
      {displayName}
    </button>
  );
};

export default ButtonSubmit;
