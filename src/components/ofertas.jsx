import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Ofertas extends Component {
  state = {};
  render() {
    //const { usuario, lan } = this.props;
    const { usuario } = this.props;
    return !usuario ? <Redirect to={"/login"}></Redirect> : <h1>Ofertas</h1>;
  }
}

export default Ofertas;
