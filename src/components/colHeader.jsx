import React from "react";
const ColHeader = props => {
  const { col } = props;
  return (
    <div className="row text-center pt-4">
      <div className="col col-12">
        <h5 className="text-uppercase font-weight-light">
          {col.mod}: {col.captions["es"]}
        </h5>
        <p className="font-italic lead">{col.tags["es"]}</p>
      </div>
    </div>
  );
};

export default ColHeader;
