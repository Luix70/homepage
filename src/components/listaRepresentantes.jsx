import React, { Component } from "react";
import Representante from "./representante";
import Buscador from "./buscador";
class ListaRepresentantes extends Component {
  shouldComponentUpdate() {
    return true;
  }
  render() {
    const { resultConsulta, lan } = this.props;
    if (!resultConsulta || resultConsulta.representantes.length === 0)
      return null;
    // console.log(
    //   "renderizada lista de representantes " +
    //     (resultConsulta ? resultConsulta.representantes.length : 0)
    //);
    return (
      <React.Fragment>
        <Buscador lan={lan} onSearch={this.onSearch}></Buscador>

        {resultConsulta === null ? (
          <span>&nbsp;</span>
        ) : (
          resultConsulta.representantes.map(repre => (
            <Representante
              key={repre.codrep}
              repres={repre}
              onSort={this.handleSortCustomers}
              lan={lan}
            />
          ))
        )}
      </React.Fragment>
    );
  }
}

export default ListaRepresentantes;
