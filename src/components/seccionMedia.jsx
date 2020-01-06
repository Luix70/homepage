import React from "react";
const SeccionMedia = prop => {
  const { seccion, folder, lan } = prop;
  return (
    <div className="col-12">
      <div className="col-12 text-center ">
        <h3>{seccion.titulo[lan].toUpperCase()}</h3>
      </div>
      <div className="col-12 text-center ">
        {seccion.subtipo === "imagen" ? (
          <img
            src={folder + seccion.archivo}
            alt={seccion.archivo}
            className="img-fluid"
          />
        ) : (
          <div class="embed-responsive  embed-responsive-16by9 ">
            <iframe
              class="embed-responsive-item"
              title="Video"
              src={folder + seccion.archivo}
              allowfullscreen
            ></iframe>
          </div>
        )}
      </div>
      <div className="col-12 text-center ">
        <span>{seccion.pie[lan]}</span>
      </div>
    </div>
  );
};

export default SeccionMedia;
