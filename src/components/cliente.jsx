import React from "react";
// al ser una SFC no se requiere importar Component
import Operacion from "./operacion";
const matchCriteria = (doc, criterioDocs) => {
  //console.log(criterioDocs);
  return false;
};
const Cliente = ({ cli, lan, criterioDocs, enCurso, facturados }) => {
  var rzs = cli.rzs;
  var poblacion = cli.poblacion;
  return (
    <div className="container-fluid">
      <div className="row bg-primary text-light p-2  " key={cli.codigo}>
        <div className="col-12 lead">
          <strong>{rzs}</strong>
          <span className="d-none d-md-inline">
            {" ( " + poblacion + " ) "}
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
            if (criterioDocs !== "" && !matchCriteria(doc, criterioDocs))
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
