import React from "react";
const ColIntro = props => {
  const { col } = props;
  return (
    <div className="row row-12">
      <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <img
          className="rounded img-fluid"
          src={"/resources/img/" + col.thumbnail}
          alt={col.thumbnail}
        />
      </div>
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <blockquote className="blockquote">
          <p>
            {col.desc["es"]}
          </p>
        </blockquote>
      </div>
    </div>
  );
};

export default ColIntro;
