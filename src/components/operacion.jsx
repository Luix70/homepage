/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Linea from "./linea";
import { Link } from "react-router-dom";
import t from "./operacion.lit.json";
import MaterialIcon from "react-google-material-icons";
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

            <div className="dropdown p-0 ">
              <button
                className="btn btn-secondary btn-sm dropdown-toggle p-1 pb-0"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <MaterialIcon icon="info" size={24} />
              </button>
              <div
                className="dropdown-menu dropdown-menu-right "
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Ocultar
                </a>
                <a className="dropdown-item" href="#">
                  Artículos
                </a>
                <a className="dropdown-item" href="#">
                  Estado
                </a>
              </div>
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
