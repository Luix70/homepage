import React from "react";
import t from "./linea.lit.json";
import Highlighter from "react-highlight-words";
const Linea = ({ linea, isNew, lan, criterioDocs, usuario }) => {
  return (
    <React.Fragment>
      {isNew ? (
        <React.Fragment>
          <div className="row pb-1 px-2 mt-3  border-bottom border-top  text-primary border-light">
            <div className="col-12 col-md-3 font-weight-bold px-1">
              {"P" + linea.pedido + ". (" + linea.fechapedido + ") "}
            </div>
            <div className="col-12 col-md-9 font-italic pl-4">
              {t.RE[lan] + linea.referencia}
            </div>
          </div>
        </React.Fragment>
      ) : null}
      <div className="row px-2">
        <div className="col-2 col-md-1 p-0 pl-2">
          <strong>
            <Highlighter
              searchWords={[criterioDocs]}
              autoEscape={true}
              textToHighlight={linea.coart}
            ></Highlighter>
          </strong>
        </div>
        <div className="col-7 col-md-9 p-0">
          <Highlighter
            searchWords={[criterioDocs]}
            autoEscape={true}
            textToHighlight={linea.descripcion}
          ></Highlighter>
        </div>
        <div
          className={
            linea.cantidad === 1 || linea.cantidad === 0
              ? "col-3 col-md-2 p-0 pr-2 text-right"
              : "col-3 col-md-2 p-0 pr-2 text-right text-danger"
          }
        >
          {linea.cantidad === 1 ? "" : linea.cantidad + " x "}
          <strong>
            {linea.precio !== 0 && usuario && usuario.VerPrecios
              ? Number.parseFloat(linea.precio).toFixed(2) + " €"
              : ""}
          </strong>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-2 col-md-1 p-0">&nbsp;</div>
        <div className="col-7 col-md-9 p-0 pl-2 text-muted  font-italic">
          <Highlighter
            searchWords={[criterioDocs]}
            autoEscape={true}
            textToHighlight={linea.ref_linea}
          ></Highlighter>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Linea;
