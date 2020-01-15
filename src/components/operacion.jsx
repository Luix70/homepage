import React from "react";
import Linea from "./linea";
import { Link } from "react-router-dom";
// al ser una SFC no se requiere importar Component
const Operacion = ({ documento: doc }) => {
  return (
    <div className="card mb-3">
      <div className="card-header bg-secondary">
        <div className="row ">
          <div className="col-2">
            <strong>
              <Link
                to={`/scans/${doc.tipodoc}/${doc.codigodoc}`}
                className="text-dark"
              >
                {doc.tipodoc + " - " + doc.codigodoc}
              </Link>{" "}
            </strong>
          </div>

          <div className="col-2">
            Fecha:
            {doc.fechapedido.replace(" 0:00:00", "")}
          </div>
          <div className="col-5">Ref: {doc.referencia}</div>
          <div className="col-1 text-right">Bruto: </div>
          <div className="col-2 text-right">
            <b>{Number.parseFloat(doc.Importebruto).toFixed(2)} </b>€
          </div>
        </div>
      </div>
      <div className="card-body small">
        <div className="row">
          <div className="col-1">&nbsp;</div>
          <div className="col-11">
            {doc.lineas.map(linea => (
              <Linea key={linea.codLinea} linea={linea} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operacion;
