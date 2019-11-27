import React, { Component } from "react";
import Representante from "./representante";
class ListaRepresentantes extends Component {
  shouldComponentUpdate() {
    return true;
  }
  render() {
    const { resultConsulta } = this.props;

    console.log(
      "renderizada lista de representantes " +
        (resultConsulta ? resultConsulta.representantes.length : 0)
    );
    return (
      <div className="col" style={{ backgroundColor: "#d6d8db" }}>
        {" "}
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
      </div>
    );
  }
}

export default ListaRepresentantes;
