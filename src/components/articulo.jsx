import React from "react";
const Articulo = prop => {
  const { art, lan } = prop;
  return (
    <div className="row">
      <div className="col-1 bg-light">
        <h5>{art.cod}</h5>
      </div>
      <div className="col-5 bg-light">
        <h5>{art.desc[lan]}</h5>
      </div>
    </div>
  );
};

export default Articulo;
