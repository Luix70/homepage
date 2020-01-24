import React from "react";
// al ser una SFC no se requiere importar Component
import Operacion from "./operacion";
const Cliente = ({ cli, lan }) => {
  return (
    <div className="container-fluid">
      <div className="row bg-primary text-light p-2  " key={cli.codigo}>
        <div className="col-12 lead">
          <strong>{cli.rzs}</strong>{" "}
          <span className="d-none d-md-inline">
            {" "}
            {" ( " + cli.poblacion + " ) "}
          </span>
        </div>
        <div className="col-12 lead pl-4">
          &nbsp;<span className="d-md-none"> {cli.poblacion}</span>
        </div>
      </div>
      <div className="row" key={cli.codigo + "-ops"}>
        <div className="col-12 mt-3 ">
          {cli.documentos.map(doc => (
            <Operacion key={doc.tipodoc + doc.codigodoc} doc={doc} lan={lan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cliente;
