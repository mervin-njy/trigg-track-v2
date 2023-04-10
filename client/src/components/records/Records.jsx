import React, { useState } from "react";

const Records = ({ loggedUserData }) => {
  return (
    <div>
      {Object.keys(loggedUserData).map((element, ind) => {
        return <h2 key={ind}>{element}</h2>;
      })}
    </div>
  );
};

export default Records;
