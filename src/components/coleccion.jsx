import React from "react";
const Coleccion = props => {
  const col = props.match.params.col;
  return (
    <div>
      <h1>Coleccion: {col} </h1>
    </div>
  );
};

export default Coleccion;
