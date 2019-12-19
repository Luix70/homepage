import React, { Component } from "react";
import ListGroup from "./common/listGroup";
class MenuRepresentantes extends Component {
  render() {
    const {
      onItemSelect,
      listaRepresentantes,
      selectedRepre
      // ,FechaConsulta,
      // FechaCache
    } = this.props;

    return (
      <ListGroup
        onItemSelect={onItemSelect}
        itemList={listaRepresentantes}
        itemId="codrep" //identificador del elemento
        itemValue="nombre" // valor que se mostrará
        selectedItem={selectedRepre}
      />
    );
  }
}

export default MenuRepresentantes;
