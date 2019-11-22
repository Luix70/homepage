import React from "react";
const ColIntro = props => {
  const { col, lan } = props;
  return (
    <div className="row mx-0 px-0 w-100">
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-4 mx-0 text-center">
        <img
          className="rounded img-fluid"
          src={"/resources/img/" + col.mod + "/" + col.tec_thumbnail}
          alt={col.thumbnail}
        />
      </div>
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-4 mx-0 text-center ">
        <p className="lead">{col.desc[lan]}</p>
      </div>
    </div>
  );
};

export default ColIntro;
