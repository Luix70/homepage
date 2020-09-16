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

  AddtoCart = (obj) => {
    const { listaOfertas } = this.state;

    //hacemos copia de los objetos del estado a fin de actualizarlos luego
    const newListaOfertas = [...listaOfertas];

    //obtenemos una referencia a la oferta que estamos tratando de añadir

    const oferta = newListaOfertas.find((el) => el.Id === obj.Id);

    // reducimos la cantidad de disponibles en una unidad
    if (oferta.Disponibles > 0) {
      oferta.Disponibles--;
      oferta.Reservadas++;
    }
    this.setState({ listaOfertas: newListaOfertas });

    //console.log("Añadido item " + obj.Cod);
  };

  render() {
    const { usuario, lan } = this.props;
    const { listaOfertas } = this.state;

    const totalReservadas = listaOfertas.reduce(
      (acc, el) => acc + el.Reservadas,
      0
    ); // el valor inicial es para que considere acc como un integer y no como un object

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
              <p className="p-0 m-0">{totalReservadas}</p>
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
              handleClick={this.AddtoCart}
            ></ItemOferta>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Ofertas;
