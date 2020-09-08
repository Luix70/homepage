import React from "react";
const ColHeader = props => {
  const { col, lan } = props;
  return (
    <div className="row">
      <div className="col-12 mt-4 px-0 mx-0 text-center">
        <h2 className="text-uppercase font-weight-light px-4">
          {col.mod}: {col.captions[lan]}
        </h2>
        <p className="font-italic lead px-4 ">{col.tags[lan]}</p>
      </div>
    </div>
  );
};

export default ColHeader;
