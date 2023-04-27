import React, { useState, useEffect } from "react";

const RecordCard = ({ date, entries }) => {
  // functions -------------------------------------------------------------------------------------------------------

  // states ----------------------------------------------------------------------------------------------------------
  // const [conditions, setConditions] = useState([]); // for storing variables on entries load + rerender on user changes
  // const [variables, setVariables] = useState([]); // for storing variables on entries load + rerender on user changes

  // event handlers --------------------------------------------------------------------------------------------------
  // TODO:
  // 1. prepare for handle CRUD operations (ONLY Update/Delete) on user interaction

  // // effects ------------------------------------------------------------------------------------------------------
  // // #1 - run on mount to set conditions & variables based on entries prop
  // useEffect(() => {
  //   // TODO:
  //   // 1. change state from array to k-v pair
  //   // 2. check why this useEffect runs many times on rerender
  //   // 3. sort into nested k-v pair: name > category > title: item
  //   entries.map((element) => {
  //     console.log("RecordCard, items - ", element);
  //     element.type === "Condition" &&
  //       setConditions((prevConditions) => {
  //         return [...prevConditions, element];
  //       });

  //     element.type === "Variable" &&
  //       setVariables((prevVariables) => {
  //         return [...prevVariables, element];
  //       });
  //   });
  // }, []);

  // render component --------------------------------------------------------------------------------------------
  return (
    <div>
      <h2 className="tracking-widest text-3xl font-medium mb-12">{date}</h2>

      <section className="flex flex-wrap justify-start">
        <div className="w-3/12">
          <h1 className="tracking-widest text-3xl font-bold mb-4">
            Conditions
          </h1>

          {Object.values(entries["Condition"]).map((condition, i) => {
            return (
              <>
                <h1 className="tracking-widest text-2xl font-italic mb-4">
                  {Object.keys(entries["Condition"])}
                </h1>

                <div key={i} className="flex flex-wrap">
                  <h2 className="w-1/12 tracking-widest text-2xl font-medium mr-4">
                    {condition.title}
                  </h2>
                  <h2 className="tracking-widest text-2xl font-medium">
                    {condition.item}
                  </h2>
                </div>
              </>
            );
          })}
        </div>

        <div className="w-9/12">
          <h1 className="tracking-widest text-3xl font-bold mb-4">Variables</h1>

          {Object.values(entries["Variable"]).map((variable, i) => {
            return (
              <>
                <h1 className="tracking-widest text-2xl font-italic mb-4">
                  {Object.keys(entries["Variable"])}
                </h1>
                
                <div key={i} className="flex flex-wrap">
                  <h2 className="w-2/12 tracking-widest text-2xl font-medium mr-4">
                    {variable.title}
                  </h2>
                  <h2 className="tracking-widest text-2xl font-medium">
                    {variable.item}
                  </h2>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default RecordCard;
