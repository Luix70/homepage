import React from "react";
import queryString from "query-string";
const Activate = props => {
  let url = props.location.search;
  let params = queryString.parse(url);
  console.log(params);

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1>{params.cod.replace(/ /g, "+")}</h1>
      </div>
      <div className="d-flex justify-content-center">
        <h1>{params.cli}</h1>
      </div>
    </div>
  );
};

export default Activate;
