import React, { Component } from "react";
import _ from "lodash";

import Cliente from "./cliente";
//import t from "./representante.lit.json";

class Representante extends Component {
  state = {
    sortColumn: { path: "codigo", order: "asc" }
  };

  criterioDocs = "";

  handleSortCustomers = header => {
    this.setState({
      sortColumn: {
        path: header,
        order:
          this.state.sortColumn.path === header
            ? this.state.sortColumn.order === "asc"
              ? "desc"
              : "asc"
            : "asc"
      }
    });
  };

  isInCli = (cli, criterio, enCurso, facturados) => {
    //console.log(criterio === "");
    this.criterioDocs = "";

    const cliCumpleCriterio =
      criterio !== "" &&
      (cli.rzs.toUpperCase().includes(criterio.toUpperCase()) ||
        cli.poblacion.toUpperCase().includes(criterio.toUpperCase()));

    if (cliCumpleCriterio) {
      //console.log("no esta en la rzs ni en la poblacion");
      return true;
    }

    const hayDocumentos = this.isInDocs(
      cli.documentos,
      criterio,
      enCurso,
      facturados
    );

    if (hayDocumentos) {
      this.criterioDocs = criterio;
      //console.log("no hay documentos");
      return true;
    }

    return false;
  };

  isInDocs = (documentos, criterio, enCurso, facturados) => {
    var InDoc = false;
    for (var i = 0; i < documentos.length; i++) {
      const blnTipo =
        (facturados && documentos[i].tipodoc === "F") ||
        (enCurso &&
          (documentos[i].tipodoc === "P" || documentos[i].tipodoc === "A"));

      //console.log(blnTipo);

      if (blnTipo) {
        if (
          documentos[i].referencia
            .toUpperCase()
            .includes(criterio.toUpperCase())
        ) {
          InDoc = true;
          break;
        } else {
          // a ver si está en las lineas
          if (this.isInLines(documentos[i].lineas, criterio)) {
            InDoc = true;
            break;
          }
        }
      }
    }
    return InDoc;
  };

  isInLines = (lineas, criterio) => {
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
  render() {
    const { repres, lan, criterio, enCurso, facturados } = this.props;
    const { sortColumn } = this.state;
    const listaclientes = repres.Clientes;

    //console.log(repres.Clientes);
    // console.log(
    //   `ordenamos los clientes del representante ${nombreRepre} por la columna ${ordenarPor} (${orden})`
    // );

    const listaOrdenada = _.orderBy(
      listaclientes,
      [sortColumn.path],
      [sortColumn.order]
    );

    return listaOrdenada.map(cli => {
      if (this.isInCli(cli, criterio, enCurso, facturados)) {
        console.log("CriterioDocs: " + this.criterioDocs);
        return (
          <Cliente
            cli={cli}
            lan={lan}
            key={cli.codigo}
            criterio={criterio}
            criterioDocs={this.criterioDocs}
            enCurso={enCurso}
            facturados={facturados}
            isInDocs={this.isInDocs}
          ></Cliente>
        );
      } else {
        return null;
      }
    });
  }
}

export default Representante;
