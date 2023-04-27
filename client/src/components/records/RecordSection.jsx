import React from "react";

// RECURSIVE COMPONENT *******************************************************************************************
const RecordSection = ({ type, content, width, headerFont }) => {
  // content = name in data tree e.g. eczema (for condition), diet (for variable)
  // name: category hierachy e.g. diet: breakfast

  // content = category in data tree e.g. itch (for eczema for condition), breakfast (for diet for variable)
  // category: record details (bottom in data tree hierachy)

  // render component --------------------------------------------------------------------------------------------
  return (
    <div className={width}>
      <h1
        className="tracking-widest font-bold mb-4"
        style={{ fontSize: headerFont }}
      >
        {type}
      </h1>

      {Object.values(content).map((val, i) => {
        return (
          <section key={i}>
            {/* stop recursion criteria: category: title & item */}
            {!("title" in val) && !("item" in val) && (
              <div>
                {/* ----- SUB-HEADER ----- */}
                <h1 className="tracking-widest text-2xl font-italic mb-4">
                  {Object.keys(content)}
                </h1>

                {/* ----- BODY ----- */}
                {Object.values(val).map((innerVal, j) => {
                  return (
                    <div className="h-max p-8 border-solid border-2 rounded-xl mr-4">
                      <RecordSection
                        type={Object.keys(val)[j]}
                        content={innerVal}
                        headerFont={"1.5rem"}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {"title" in val && "item" in val && (
              <div key={i} className="flex flex-wrap">
                <h2 className="w-3/12 pr-2 tracking-widest text-xl font-medium">
                  {val.title}
                </h2>
                <h2 className="w-9/12 tracking-widest text-xl font-medium">
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
