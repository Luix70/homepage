import React, { Component } from "react";
import { getColeccion } from "./../services/datosWeb";
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
      console.log("empty");
      return <h1>{col}</h1>;
    } else {
      console.log(col, coleccion);
      return (
        <div>
          <h1>{col}</h1>
          <p>{coleccion.desc["es"]} </p>
        </div>
      );
    }
  }
}

export default Coleccion;
