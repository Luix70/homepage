import React, { Component } from "react";
import Representante from "./representante";
class ListaRepresentantes extends Component {
  shouldComponentUpdate() {
    return true;
  }
  render() {
    const { resultConsulta } = this.props;
    if (!resultConsulta || resultConsulta.representantes.length === 0)
      return null;
    console.log(
      "renderizada lista de representantes " +
        (resultConsulta ? resultConsulta.representantes.length : 0)
    );
    return (
      <React.Fragment>
        {resultConsulta === null ? (
          <span>&nbsp;</span>
        ) : (
          resultConsulta.representantes.map(repre => (
            <Representante
              key={repre.codrep}
              repres={repre}
              onSort={this.handleSortCustomers}
            />
          ))
        )}
      </React.Fragment>
    );
  }
}

export default ListaRepresentantes;
