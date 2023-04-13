import React, { useState } from "react";

const RecordCard = ({ date, entries }) => {
  return (
    <div>
      <h2 className="tracking-widest text-3xl font-medium mb-20">{date}</h2>
      {Object.values(entries).map((e, i) => {
        console.log("RecordCard", "no. of entries:", entries);
        return (
          <h2 key={i} className="tracking-widest text-2xl font-medium">
            {e}
          </h2>
        );
      })}
    </div>
  );
};

export default RecordCard;
