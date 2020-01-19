import React from "react";

const Linea = ({ linea }) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-1">
          <strong>{linea.coart}</strong>
        </div>
        <div className="col-9">{linea.descripcion}</div>
        <div
          className={
            linea.cantidad === 1 || linea.cantidad === 0
              ? "col-2 text-right"
              : "col-2 text-right text-danger"
          }
        >
          {linea.cantidad === 1 ? "" : linea.cantidad + " x "}
          {linea.precio !== 0
            ? Number.parseFloat(linea.precio).toFixed(2) + " €"
            : ""}
        </div>
      </div>
      <div className="row">
        <div className="col-1">&nbsp;</div>
        <div className="col-9 text-muted pl-4">{linea.ref_linea}</div>
        <div className="col-1">&nbsp;</div>
      </div>
    </React.Fragment>
  );
};

export default Linea;
