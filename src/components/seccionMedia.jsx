import React from "react";
const SeccionMedia = prop => {
  const { seccion, folder } = prop;
  return (
    <div className="col-12">
      <img
        src={folder + seccion.archivo}
        alt={seccion.archivo}
        className="img-fluid"
      />
    </div>
  );
};

export default SeccionMedia;
