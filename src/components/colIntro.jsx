import React from "react";
const ColIntro = props => {
  const { col, lan } = props;
  return (
    <div className="row pb-5">
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-0 mx-0 text-center">
        <img
          className="rounded img-fluid"
          src={"/resources/img/" + col.mod + "/" + col.tec_thumbnail}
          alt={col.thumbnail}
        />
      </div>
      <div
        className="col-xs-12 col-sm-12 col-md-5 col-lg-5 p4
      -0 mx-0 mx-auto my-auto justify-content-center text-center"
      >
        <p className="font-weight-lighter font-italic h4 text-secondary pt-4 px-4">{col.desc[lan]}</p>
      </div>
    </div>
  );
};

export default ColIntro;
