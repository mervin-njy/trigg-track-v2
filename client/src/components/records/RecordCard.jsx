import React, { useState } from "react";

const RecordCard = ({ date, entries }) => {
  return (
    <div>
      <h2 className="tracking-widest text-3xl font-medium mb-12">{date}</h2>
      {entries.map((e, i) => {
        // console.log("RecordCard", "entry no:", i, ". Entry:", e);
        return (
          <h2 key={i} className="tracking-widest text-2xl font-medium">
            {e.item}
          </h2>
        );
      })}
    </div>
  );
};

export default RecordCard;
