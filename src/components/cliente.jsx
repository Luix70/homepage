import React from "react";
// al ser una SFC no se requiere importar Component
import Operacion from "./operacion";
const Cliente = ({ cliente: cli, lan }) => {
  return (
    <React.Fragment>
      <div className="row bg-secondary text-light" key={cli.codigo}>
        <div className="col-2">
          <strong>{cli.codigo}</strong>
        </div>
        <div className="col-8">
          <em>
            {cli.rzs} ( {cli.poblacion})
          </em>
        </div>
        <div className="col-2">Docs: {cli.totalDocumentos}</div>
      </div>
      <div className="row" key={cli.codigo + "-ops"}>
        <div className="col-12 mt-3">
          {cli.documentos.map(doc => (
            <Operacion
              key={doc.tipodoc + doc.codigodoc}
              documento={doc}
              lan={lan}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cliente;
