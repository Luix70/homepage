import React, { Component } from "react";
import { getColeccion } from "./../services/datosWeb";
import ColHeader from "./colHeader";
import ColIntro from "./colIntro";
class Coleccion extends Component {
  state = { coleccion: null };

  async componentDidMount() {
    const { col } = this.props.match.params;
    const coleccion = await getColeccion(col);
    this.setState({ coleccion });
  }

  render() {
    const { col } = this.props.match.params;
    const { coleccion } = this.state;

    if (!coleccion) {
      return <h1>{col}</h1>;
    } else {
      //console.log(col, coleccion);
      return (
        <div className="container">
          <ColHeader col={coleccion}></ColHeader>
          <ColIntro col={coleccion}></ColIntro>
        </div>
      );
    }
  }
}

export default Coleccion;
