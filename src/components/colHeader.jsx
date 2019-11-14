import React from "react";
const ColHeader = props => {
  const { col } = props;
  return (
    <div className="col-12 pt-5 mt-5 px-0 mx-0 text-center">
      <h2 className="text-uppercase font-weight-light">
        {col.mod}: {col.captions["es"]}
      </h2>
      <p className="font-italic lead">{col.tags["es"]}</p>
    </div>
  );
};

export default ColHeader;
