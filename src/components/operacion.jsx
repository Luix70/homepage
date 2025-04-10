/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Linea from "./linea";
import t from "./operacion.lit.json";
import EstadoOperacion from "./estadoOperacion";
import getScans from "../services/archivos";
import Highlighter from "react-highlight-words";
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
    const { doc, lan, criterioDocs, usuario } = this.props;
    const { expanded, scans } = this.state;
    //console.log(usuario);
    var olddoc = 0;

    return (
      <div className="card mb-3 ">
        <div
          className="card-header  bd-highlight text-primary py-0 px-2 "
          onClick={this.toggleExpanded}
        >
          <div
            className="row py-1"
            style={{
              cursor: "pointer",
            }}
          >
            <div className="col-8  d-flex align-items-center">
              <strong>{doc.tipodoc + doc.codigodoc}</strong>&nbsp;
              {"(" + doc.fechadoc.replace(" 0:00:00", "") + ") "}
            </div>

            <div className="col-4 d-flex align-items-center flex-row-reverse">
              <button
                className={
                  "btn custom-btn-circle " +
                  (expanded ? "btn-primary" : "btn-secondary")
                }
              >
                <strong>{expanded ? "- i" : "+ i"} </strong>
              </button>
              <span className="mx-1">
                <b>
                  {usuario && usuario.VerPrecios === true
                    ? Number.parseFloat(doc.Importebruto).toFixed(2) + "€"
                    : null}{" "}
                </b>
              </span>{" "}
            </div>
            <div className="col-12 text-secondary pl-4 ">
              {" "}
              <strong>{t.RE[lan]}</strong>{" "}
              <Highlighter
                searchWords={[criterioDocs]}
                autoEscape={true}
                textToHighlight={" ( " + doc.referencia + " ) "}
              ></Highlighter>{" "}
            </div>
          </div>
        </div>
        <div
          className={"card-body small py-0 px-0 " + (expanded ? "" : "d-none")}
        >
          <div className="row bg-light-gray m-0  p-2">
            <div className="col-12 p-0">
              <h5 className="text-primary">{t.AR[lan]}</h5>
            </div>
            <div className="col-12 px-1">
              {doc.lineas.map((linea) => {
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
                    criterioDocs={criterioDocs}
                    usuario={usuario}
                  />
                );
              })}
            </div>
          </div>
          <div className="row m-0 bg-lighter-gray p-2">
            <div className="col-12 px-1">
              <h5 className="text-primary">{t.ES[lan]}</h5>
            </div>
            <div className="col-12 px-0">
              {usuario ? (
                <EstadoOperacion
                  doc={doc}
                  lan={lan}
                  scans={scans}
                  usuario={usuario}
                ></EstadoOperacion>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Operacion;
