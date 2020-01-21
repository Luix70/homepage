/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Linea from "./linea";
import { Link } from "react-router-dom";
import t from "./operacion.lit.json";
import EstadoOperacion from "./estadoOperacion";
// al ser una SFC no se requiere importar Component
class Operacion extends Component {
  state = { expanded: false };
  toggleExpanded = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    const { doc, lan } = this.props;
    const { expanded } = this.state;
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
              <button
                className={
                  "btn custom-btn-circle " +
                  (expanded ? "btn-primary" : "btn-secondary")
                }
                onClick={this.toggleExpanded}
              >
                <strong>{expanded ? "- i" : "+ i"} </strong>
              </button>
            </div>
          </div>
        </div>
        <div className={"card-body small p-0 " + (expanded ? "" : "d-none")}>
          <div className="row bg-light-gray m-0  p-4">
            <div className="col-12">
              <h5 className="text-primary">{t.AR[lan]}</h5>
            </div>
            <div className="col-12">
              {doc.lineas.map(linea => (
                <Linea key={linea.codLinea} linea={linea} />
              ))}
            </div>
          </div>
          <div className="row m-0 bg-lighter-gray p-4">
            <div className="col-12">
              <h5 className="text-primary">{t.ES[lan]}</h5>
            </div>
            <div className="col-12">
              <EstadoOperacion doc={doc} lan={lan}></EstadoOperacion>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Operacion;
