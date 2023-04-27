import React, { useState, useEffect } from "react";
import RecordSection from "./RecordSection";

const RecordCard = ({ date, entries }) => {
  // variables ----------------------------------------------------------------------------------------------------
  const nullMessage = { "No records yet.": "" };
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
      <h2 className="tracking-widest text-4xl font-medium mb-10">{date}</h2>

      <section className="flex flex-wrap justify-between">
        {/* Left: Conditions table (IF EXISTS) */}
        <RecordSection
          type={"Conditions"}
          content={"Condition" in entries ? entries["Condition"] : nullMessage} // e.g. eczema
          width={"w-3/10"}
          headerFont={"1.8rem"}
        />

        {/* Right: Variables table (IF EXISTS)*/}
        <RecordSection
          type={"Variables"}
          content={"Variable" in entries ? entries["Variable"] : nullMessage} // e.g. diet
          width={"w-8/12"}
          headerFont={"1.8rem"}
        />
      </section>
    </div>
  );
};

export default RecordCard;
