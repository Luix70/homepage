import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import getData from "../services/ofertas";

class Ofertas extends Component {
  state = { listaOfertas: [] };
  async componentDidMount() {
    this.setState({
      listaOfertas: await getData(),
    });
  }

  render() {
    //const { usuario, lan } = this.props;
    const { usuario } = this.props;
    const { listaOfertas } = this.state;
    return !usuario ? (
      <Redirect to={"/login"}></Redirect>
    ) : (
      listaOfertas.map((oferta) => {
        return <h1>{oferta.Cod}</h1>;
      })
    );
  }
}

export default Ofertas;
