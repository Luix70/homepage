import React, { Component } from "react";
import Linea from "./linea";
import { Link } from "react-router-dom";
import t from "./operacion.lit.json";
// al ser una SFC no se requiere importar Component
class Operacion extends Component {
  state = {};
  render() {
    const { documento: doc, lan } = this.props;
    return (
      <div className="card mb-3">
        <div className="card-header  bd-highlight text-primary">
          <div className="d-flex justify-content-between">
            <div>
              <strong>
                <Link to={`/scans/${doc.tipodoc}/${doc.codigodoc}`}>
                  {doc.tipodoc + " - " + doc.codigodoc}
                </Link>{" "}
              </strong>
            </div>

            <div className="ml-3">
              {t.DA[lan]}
              {doc.fechapedido.replace(" 0:00:00", "")}
            </div>
            <div className="ml-3">
              {" "}
              {t.RE[lan]} {doc.referencia}
            </div>

            <div className="ml-3 text-right">
              <b>
                {t.BR[lan]}
                {Number.parseFloat(doc.Importebruto).toFixed(2)}{" "}
              </b>
              €
            </div>
          </div>
        </div>
        <div className="card-body small ">
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
  }
}

export default Operacion;
