import React from "react";

// RECURSIVE COMPONENT *******************************************************************************************
const RecordSection = ({ type, content, width, headerFont }) => {
  // content = name in data tree e.g. eczema (for condition), diet (for variable)
  // name: category hierachy e.g. diet: breakfast

  // content = category in data tree e.g. itch (for eczema for condition), breakfast (for diet for variable)
  // category: record details (bottom in data tree hierachy)

  // functions ----------------------------------------------------------------------------------------------------
  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  // render component --------------------------------------------------------------------------------------------
  return (
    <div className={width + " hover:bg-main6 rounded-xl px-4 py-2"}>
      <h1
        className="tracking-wider font-semibold p-1 border-b-2 mb-6"
        style={{ fontSize: headerFont }}
      >
        {type}
      </h1>

      {/* if null */}
      {!Object.values(content) && (
        <h2 className="tracking-widest text-2xl font-italic">
          {Object.keys(content)}
        </h2>
      )}

      {Object.values(content) &&
        Object.values(content).map((val, i) => {
          return (
            <section key={i}>
              {/* stop recursion criteria: category: title & item */}
              {console.log("content", content)}
              {!("title" in val) && !("item" in val) && (
                <>
                  {/* ----- SUB-HEADER ----- */}
                  <div className="flex flex-wrap justify-start tracking-widest text-2xl font-italic px-2 mb-2">
                    <h1 className="mr-4">{i + 1 + "."}</h1>
                    <h1>{Object.keys(content)[i]}</h1>
                  </div>

                  {/* ----- BODY ----- */}
                  {Object.values(val).map((innerVal, j) => {
                    return (
                      <div className="h-max p-4 border-main2 border-solid border-1 rounded-lg mb-4">
                        <RecordSection
                          type={Object.keys(val)[j]}
                          content={innerVal}
                          headerFont={"1.2rem"}
                        />
                      </div>
                    );
                  })}
                </>
              )}

              {"title" in val && "item" in val && (
                <div
                  key={i}
                  className={
                    "flex flex-wrap py-1 hover:bg-blueMain rounded-md my-1" +
                    (i % 2 === 0 && " bg-main7")
                  }
                >
                  <h2 className="w-2/12 px-3 tracking-wider text-md font-medium">
                    {val.title}
                  </h2>
                  <h2 className="w-10/12 tracking-wider text-md font-medium">
                    {val.item}
                  </h2>
                </div>
              )}
            </section>
          );
        })}
    </div>
  );
};

export default RecordSection;
