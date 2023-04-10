import React, { useState } from "react";

const Records = ({ loggedUserData }) => {
  return (
    <>
      {Object.keys(loggedUserData).map((element, ind) => {
        return (
          <div className="flex flex-wrap justify-between mb-8">
            <h2 key={ind} className="tracking-wider text-4xl font-800 mx-3">
              {element}
            </h2>
          </div>
        );
      })}
    </>
  );
};

export default Records;
