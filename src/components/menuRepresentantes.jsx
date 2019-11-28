import React, { Component } from "react";
import ListGroup from "./common/listGroup";
class MenuRepresentantes extends Component {
  render() {
    const {
      onItemSelect,
      listaRepresentantes,
      selectedRepre,
      FechaConsulta,
      FechaCache
    } = this.props;

    return (
      <div className="col-3 smallprint">
        <div className="row">
          <ListGroup
            onItemSelect={onItemSelect}
            itemList={listaRepresentantes}
            itemId="codrep" //identificador del elemento
            itemValue="nombre" // valor que se mostrará
            selectedItem={selectedRepre}
          />
        </div>
        <div style={{ paddingLeft: "2em" }} className="row">
          {FechaConsulta === ""
            ? ""
            : "Consulta: " + new Date(FechaConsulta).toLocaleTimeString()}

          {"  "}
          {FechaConsulta === ""
            ? ""
            : "/ Caché: " + new Date(FechaCache).toLocaleTimeString()}
        </div>
      </div>
    );
  }
}

export default MenuRepresentantes;
