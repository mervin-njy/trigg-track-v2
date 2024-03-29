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
    // <div className={width + " hover:bg-main6 rounded-xl px-4 py-2"}>
    <div className={width}>
      <h1
        className="tracking-wider font-semibold p-1 border-b-2 mx-2 mb-6"
        style={{ fontSize: headerFont }}
      >
        {type}
      </h1>

      {Object.values(content).map((val, i) => {
        return (
          <section key={i}>
            {/* stop recursion criteria: category: title & item */}
            {val && !("title" in val) && !("item" in val) && (
              <div className="hover:bg-main6 rounded-xl px-4 py-2">
                {/* <div> */}
                {/* ----- SUB-HEADER ----- */}
                <div className="flex flex-wrap justify-start tracking-widest text-2xl font-italic px-2 mb-2">
                  <h1 className="mr-4">{i + 1 + "."}</h1>
                  <h1>{Object.keys(content)[i]}</h1>
                </div>

                {/* ----- BODY ----- */}
                {/* SORT + RECURSIVE: repeat to render each title + entry as row */}
                {Object.values(val)
                  // .sort((a, b) =>
                  //   a["title"] === "location"
                  //     ? -1
                  //     : a["entry"].localeCompare(b["entry"])
                  // )
                  .map((innerVal, j) => {
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
              </div>
            )}

            {/* list the title + item pair (end of recursion) */}
            {val && "title" in val && "item" in val && (
              // odd / even alternate bg
              <div
                key={i}
                className={
                  "flex flex-wrap py-1 hover:bg-blueMain rounded-md my-1" +
                  (i % 2 === 0 && " bg-main7")
                }
              >
                {/* title + items => sort */}
                <h2 className="w-2/12 px-3 tracking-wider text-md font-medium">
                  {val.title}
                </h2>
                <h2 className="w-10/12 tracking-wider text-md font-medium">
                  {val.item}
                </h2>
              </div>
            )}

            {/* if no records exist for this section yet */}
            {!val && (
              <h2 className="tracking-widest text-2xl font-italic">
                {Object.keys(content)}
              </h2>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default RecordSection;
