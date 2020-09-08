import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import getData from "../services/ofertas";

import ItemOferta from "./itemOferta";

class Ofertas extends Component {
  state = { listaOfertas: [] };
  async componentDidMount() {
    this.setState({
      listaOfertas: await getData(),
    });
  }

  render() {
    const { usuario, lan } = this.props;
    const { listaOfertas } = this.state;
    return !usuario ? (
      <Redirect to={"/login"}></Redirect>
    ) : (
      <React.Fragment>
        <div className="bg-secondary d-flex justify-content-center">
          <h1 className="bg-light w-50 m-2 text-center">Filtro</h1>
        </div>
        {listaOfertas.map((oferta) => {
          return (
            <ItemOferta
              usuario={usuario}
              lan={lan}
              oferta={oferta}
            ></ItemOferta>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Ofertas;
