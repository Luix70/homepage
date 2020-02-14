import React, { Component } from "react";
import _ from "lodash";

import Cliente from "./cliente";
//import t from "./representante.lit.json";

class Representante extends Component {
  state = {
    sortColumn: { path: "codigo", order: "asc" }
  };

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

  isInCli = (cli, criterio, criterioDocs) => {
    //.log(criterio);
    if (cli.rzs.toUpperCase().includes(criterio.toUpperCase())) {
      criterioDocs = "";
      return true;
    }
    if (cli.poblacion.toUpperCase().includes(criterio.toUpperCase())) {
      criterioDocs = "";
      return true;
    }

    if (this.isInDocs(cli.documentos, criterio)) {
      criterioDocs = criterio;
      return true;
    }

    return false;
  };

  isInDocs = (documentos, criterio) => {
    var InDoc = false;
    for (var i = 0; i < documentos.length; i++) {
      if (
        documentos[i].referencia.toUpperCase().includes(criterio.toUpperCase())
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
    return InDoc;
  };

  isInLines = (lineas, criterio) => {
    var inLine = false;

    for (var i = 0; i < lineas.length; i++) {
      if (lineas[i].coart.toUpperCase().includes(criterio.toUpperCase())) {
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
    var criterioDocs = "";
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
      if (criterio === "" || this.isInCli(cli, criterio, criterioDocs)) {
        return (
          <Cliente
            cli={cli}
            lan={lan}
            key={cli.codigo}
            criterioDocs={criterioDocs}
            enCurso={enCurso}
            facturados={facturados}
          ></Cliente>
        );
      } else {
        return null;
      }
    });
  }
}

export default Representante;
