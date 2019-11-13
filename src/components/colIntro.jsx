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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit
            facere error nemo aut molestias corrupti ducimus ea eos at incidunt
            a quasi, delectus explicabo recusandae consequuntur beatae ex porro
            magni quidem. Incidunt
          </p>
        </blockquote>
      </div>
    </div>
  );
};

export default ColIntro;
