import React from "react";
// al ser una SFC no se requiere importar Component
import Operacion from "./operacion";
const Cliente = ({ cliente: cli }) => {
  return (
    <React.Fragment>
      <div className="row bg-info" key={cli.codigo}>
        <div className="col-3">
          <strong>{cli.codigo}</strong>
        </div>
        <div className="col-7">
          <em>
            {cli.rzs} ( {cli.poblacion})
          </em>
        </div>
        <div className="col-2">Docs: {cli.totalDocumentos}</div>
      </div>
      <div className="row" key={cli.codigo + "-ops"}>
        <table className="table table-sm table-borderless">
          <tbody>
            {cli.documentos.map(doc => (
              <Operacion key={doc.tipodoc + doc.codigodoc} documento={doc} />
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Cliente;
