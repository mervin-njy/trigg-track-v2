import React, { useState, useEffect } from "react";

const RecordCard = ({ date, entries }) => {
  // states ------------------------------------------------------------------------------------------------------
  const [conditions, setConditions] = useState([]); // for storing variables on entries load + rerender on user changes
  const [variables, setVariables] = useState([]); // for storing variables on entries load + rerender on user changes

  // event handlers -----------------------------------------------------------------------------------------------
  // TODO:
  // 1. prepare for handle CRUD operations (ONLY Update/Delete) on user interaction

  // // effects ------------------------------------------------------------------------------------------------------
  // #1 - run on mount to set conditions & variables based on entries prop
  useEffect(() => {
    // TODO:
    // 1. change state from array to k-v pair
    // 2. check why this useEffect runs many times on rerender
    // 3. sort into nested k-v pair: name > category > title: item
    entries.map((element) => {
      console.log("RecordCard, items - ", element);
      element.type === "Condition" &&
        setConditions((prevConditions) => {
          return [...prevConditions, element];
        });

      element.type === "Variable" &&
        setVariables((prevVariables) => {
          return [...prevVariables, element];
        });
    });
  }, []);

  // render component --------------------------------------------------------------------------------------------
  return (
    <div>
      <h2 className="tracking-widest text-3xl font-medium mb-12">{date}</h2>

      <section className="flex flex-wrap justify-start">
        {conditions.map((condition, i) => {
          return (
            <div key={i} className="flex flex-wrap w-2/5">
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
            <div key={i} className="flex flex-wrap  w-3/5">
              <h2 className="tracking-widest text-2xl font-medium">
                {variable.title}
              </h2>
              <h2 className="tracking-widest text-2xl font-medium">
                {variable.item}
              </h2>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default RecordCard;
