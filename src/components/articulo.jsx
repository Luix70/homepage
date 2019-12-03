import React from "react";
const Articulo = prop => {
  const { art } = prop;
  return (
    <div className="col-1">
      <h5>{art}</h5>
    </div>
  );
};

export default Articulo;
