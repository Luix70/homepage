/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import getData from "../services/ofertas";
import MaterialIcon from "react-google-material-icons";
import ItemOferta from "./itemOferta";

class Ofertas extends Component {
  state = { listaOfertas: [] };
  async componentDidMount() {
    this.setState({
      listaOfertas: await getData(),
    });
  }

  showCart = (ev) => {
    console.log("ver Carrito");
  };
  render() {
    const { usuario, lan } = this.props;
    const { listaOfertas } = this.state;
    return !usuario ? (
      <Redirect to={"/login"}></Redirect>
    ) : (
      <React.Fragment>
        <div className="bg-secondary row">
          <div className="bg-secondary col-8 col-md-10 m-0 text-center ">
            <h1>Filtro</h1>
          </div>
          <div
            className="bg-secondary
           col-4 col-md-2 m-0 p-0 text-center d-flex align-items-center justify-content-around"
          >
            <button
              type="button"
              className="btn btn-outline-light border-0 p-0 "
              onClick={this.showCart}
            >
              <MaterialIcon icon="shopping_cart" size={36} />
            </button>

            <div className="mr-4">
              <p className="p-0 m-0">Items</p>
              <p className="p-0 m-0">0</p>
            </div>
          </div>
        </div>

        {listaOfertas.map((oferta) => {
          return (
            <ItemOferta
              usuario={usuario}
              lan={lan}
              oferta={oferta}
              key={oferta.Id}
            ></ItemOferta>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Ofertas;
