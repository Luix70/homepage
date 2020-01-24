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

  render() {
    const { repres, lan } = this.props;
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

    return listaOrdenada.map(cli => (
      <Cliente cli={cli} lan={lan} key={cli.codigo}></Cliente>
    ));
  }
}

export default Representante;
