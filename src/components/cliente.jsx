import React from "react";
// al ser una SFC no se requiere importar Component
import Operacion from "./operacion";
import Highlighter from "react-highlight-words";

const isInDoc = (doc, criterio, enCurso, facturados) => {
  var InDoc = false;

  const blnTipo =
    (facturados && doc.tipodoc === "F") ||
    (enCurso && (doc.tipodoc === "P" || doc.tipodoc === "A"));

  //console.log(blnTipo);

  if (blnTipo) {
    if (doc.referencia.toUpperCase().includes(criterio.toUpperCase())) {
      InDoc = true;
    } else {
      // a ver si está en las lineas
      if (isInLines(doc.lineas, criterio)) {
        InDoc = true;
      }
    }
  }

  return InDoc;
};

const isInLines = (lineas, criterio) => {
  var inLine = false;

  for (var i = 0; i < lineas.length; i++) {
    const matchLinea =
      lineas[i].coart.toUpperCase().includes(criterio.toUpperCase()) ||
      lineas[i].descripcion.toUpperCase().includes(criterio.toUpperCase()) ||
      lineas[i].ref_linea.toUpperCase().includes(criterio.toUpperCase());
    if (matchLinea) {
      inLine = true;
      break;
    }
  }

  return inLine;
};

const Cliente = ({ cli, lan, criterio, criterioDocs, enCurso, facturados }) => {
  var rzs = cli.rzs;
  var nomComercial = cli.nomComercial;
  var poblacion = cli.poblacion;
  console.log("Hola" + nomComercial);
  return (
    <div className="container-fluid">
      <div className="row bg-primary text-light p-2  " key={cli.codigo}>
        <div className="col-12 lead">
          <strong>
            {" "}
            <Highlighter
              searchWords={[criterio]}
              autoEscape={true}
              textToHighlight={rzs}
            ></Highlighter>
          </strong>
          {nomComercial !== "" ? (
            <em>
              <Highlighter
                searchWords={[criterio]}
                autoEscape={true}
                textToHighlight={" ( " + nomComercial + " ) "}
              ></Highlighter>
            </em>
          ) : null}
          <span className="d-none d-md-inline">
            <Highlighter
              searchWords={[criterio]}
              autoEscape={true}
              textToHighlight={" - " + poblacion + " - "}
            ></Highlighter>
          </span>
        </div>
        <div className="col-12 lead pl-4">
          &nbsp;<span className="d-md-none"> {cli.poblacion}</span>
        </div>
      </div>
      <div className="row" key={cli.codigo + "-ops"}>
        <div className="col-12 mt-3 ">
          {cli.documentos.map(doc => {
            //console.log(facturados, enCurso, doc.tipodoc);
            if (!enCurso && (doc.tipodoc === "P" || doc.tipodoc === "A"))
              return null;
            if (!facturados && doc.tipodoc === "F") return null;
            if (
              criterioDocs !== "" &&
              !isInDoc(doc, criterioDocs, enCurso, facturados)
            )
              return null;
            return (
              <Operacion
                key={doc.tipodoc + doc.codigodoc}
                doc={doc}
                lan={lan}
                criterioDocs={criterioDocs}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cliente;
