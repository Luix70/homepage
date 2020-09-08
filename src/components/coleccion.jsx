import React, { Component } from "react";
import { getColeccion } from "./../services/datosWeb";
import ColHeader from "./colHeader";
import ColIntro from "./colIntro";
import Galeria from "./galeria";
import Secciones from "./secciones";
import ColeccionMetaTags from "./common/coleccionMetaTags";
import CircleArrow from "react-scroll-up-button";

class Coleccion extends Component {
  state = { coleccion: null };

  async componentDidMount() {
    const { col } = this.props.match.params;
    const coleccion = await getColeccion(col);
    this.setState({ coleccion });
  }

  render() {
    const { lan, BSBreak, usuario, modoEdit } = this.props;
    const { col } = this.props.match.params;
    const { coleccion } = this.state;
    //console.log(modoEdit);
    if (!coleccion || lan === "") {
      return <h1>{col}</h1>;
    } else {
      return (
        <div className="container">
          <CircleArrow />
          <ColeccionMetaTags
            col={coleccion}
            lan={lan}
            usuario={usuario}
          ></ColeccionMetaTags>
          <ColHeader col={coleccion} lan={lan} usuario={usuario}></ColHeader>
          <ColIntro col={coleccion} lan={lan} usuario={usuario}></ColIntro>
          <Galeria
            col={coleccion}
            lan={lan}
            usuario={usuario}
            modoEdit={modoEdit}
          ></Galeria>
          <Secciones
            secciones={coleccion.secciones}
            lan={lan}
            coleccion={coleccion.mod}
            BSBreak={BSBreak}
            usuario={usuario}
          ></Secciones>
        </div>
      );
    }
  }
}

export default Coleccion;
