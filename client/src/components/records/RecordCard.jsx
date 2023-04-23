import React, { useState } from "react";

const RecordCard = ({ date, entries }) => {
  // states ------------------------------------------------------------------------------------------------------
  const [conditions, setConditions] = useState(); // for storing variables on entries load + rerender on user changes
  const [variables, setVariables] = useState(); // for storing variables on entries load + rerender on user changes

  // render component --------------------------------------------------------------------------------------------
  return (
    <div>
      <h2 className="tracking-widest text-3xl font-medium mb-12">{date}</h2>

      {/* <section className="flex flex-wrap">
        {conditions.map((condition, i) => {
          return (
            <div key={i} className="w-2/5">
              <h2 className="tracking-widest text-2xl font-medium">
                {condition.title}
              </h2>
              <h2 className="tracking-widest text-2xl font-medium">
                {condition.item}
              </h2>
            </div>
          );
        })}

        {variables.map((variable, i) => {
          return (
            <div key={i} className="w-3/5">
              <h2 className="tracking-widest text-2xl font-medium">
                {variable.title}
              </h2>
              <h2 className="tracking-widest text-2xl font-medium">
                {variable.item}
              </h2>
            </div>
          );
        })}
      </section> */}
    </div>
  );
};

export default RecordCard;
