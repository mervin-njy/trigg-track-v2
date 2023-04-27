import React from "react";

const RecordSection = ({ type, name, width }) => {
  // name e.g. eczema (for condition), diet (for variable)
  // render component --------------------------------------------------------------------------------------------
  return (
    <div className={width}>
      <h1 className="tracking-widest text-3xl font-bold mb-4">{type}</h1>

      {Object.values(name).map((category, i) => {
        return (
          <section key={i}>
            <h1 className="tracking-widest text-2xl font-italic mb-4">
              {Object.keys(name)}
            </h1>

            <div key={i} className="flex flex-wrap">
              <h2 className="w-1/12 tracking-widest text-2xl font-medium mr-4">
                {category.title}
              </h2>
              <h2 className="tracking-widest text-2xl font-medium">
                {category.item}
              </h2>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default RecordSection;
