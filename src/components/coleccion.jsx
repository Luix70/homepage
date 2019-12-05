import React, { Component } from "react";
import { getColeccion } from "./../services/datosWeb";
import ColHeader from "./colHeader";
import ColIntro from "./colIntro";
import Galeria from "./galeria";
import Secciones from "./secciones";

class Coleccion extends Component {
  state = { coleccion: null };

  async componentDidMount() {
    const { col } = this.props.match.params;

    const coleccion = await getColeccion(col);
    this.setState({ coleccion });
  }

  render() {
    const { lan, BSBreak } = this.props;
    const { col } = this.props.match.params;
    const { coleccion } = this.state;

    if (!coleccion || lan === "") {
      return <h1>{col}</h1>;
    } else {
      return (
        <React.Fragment>
          <ColHeader col={coleccion} lan={lan}></ColHeader>
          <ColIntro col={coleccion} lan={lan}></ColIntro>
          <Galeria col={coleccion} lan={lan}></Galeria>
          <Secciones
            secciones={coleccion.secciones}
            lan={lan}
            coleccion={coleccion.mod}
            BSBreak={BSBreak}
          ></Secciones>
        </React.Fragment>
      );
    }
  }
}

export default Coleccion;
