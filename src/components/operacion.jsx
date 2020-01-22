/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Linea from "./linea";

import t from "./operacion.lit.json";
import EstadoOperacion from "./estadoOperacion";
import getScans from "../services/archivos";

// al ser una SFC no se requiere importar Component
class Operacion extends Component {
  state = { expanded: false, scans: null };
  toggleExpanded = async () => {
    if (!this.state.expanded && !this.state.scans) {
      const { doc } = this.props;
      const scans = await getScans(doc.tipodoc, doc.codigodoc);
      this.setState({ scans, expanded: !this.state.expanded });
    } else {
      this.setState({ expanded: !this.state.expanded });
    }
  };
  render() {
    const { doc, lan } = this.props;
    const { expanded, scans } = this.state;
    console.log(doc);
    var olddoc = 0;
    return (
      <div className="card mb-3">
        <div className="card-header  bd-highlight text-primary py-1 px-2">
          <div className="d-flex justify-content-between">
            <div>
              <strong>{doc.tipodoc + " - " + doc.codigodoc}</strong>
            </div>

            <div className="ml-3">
              {t.DA[lan]}
              {doc.fechadoc.replace(" 0:00:00", "")}
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
              {doc.lineas.map(linea => {
                var newdoc = linea.pedido;
                var isNew = false;
                if (newdoc !== olddoc) {
                  isNew = true;
                  olddoc = newdoc;
                }
                return (
                  <Linea
                    key={linea.codLinea}
                    linea={linea}
                    isNew={isNew}
                    lan={lan}
                  />
                );
              })}
            </div>
          </div>
          <div className="row m-0 bg-lighter-gray p-4">
            <div className="col-12">
              <h5 className="text-primary">{t.ES[lan]}</h5>
            </div>
            <div className="col-12">
              <EstadoOperacion
                doc={doc}
                lan={lan}
                scans={scans}
              ></EstadoOperacion>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Operacion;
