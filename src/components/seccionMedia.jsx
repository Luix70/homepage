import React from "react";
const SeccionMedia = prop => {
  const { seccion, folder, lan } = prop;
  return (
    <div className="col-12">
      <div className="col-12 text-center ">
        <h3>{seccion.titulo[lan].toUpperCase()}</h3>
      </div>
      <div className="col-12 text-center ">
        <img
          src={folder + seccion.archivo}
          alt={seccion.archivo}
          className="img-fluid"
        />
      </div>
      <div className="col-12 text-center ">
        <span>{seccion.pie[lan]}</span>
      </div>
    </div>
  );
};

export default SeccionMedia;
