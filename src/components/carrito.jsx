/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//import getData from "../services/ofertas";
import ItemOferta from "./itemOferta";

class Carrito extends Component {
  state = { listaOfertas: [] };
  //   async componentDidMount() {
  //     this.setState({
  //       listaOfertas: await getData(),
  //     });
  //   }

  AddtoCart = (obj, cant) => {
    const { listaOfertas } = this.props.location.state;

    //hacemos copia de los objetos del estado a fin de actualizarlos luego
    const newListaOfertas = [...listaOfertas];

    //obtenemos una referencia a la oferta que estamos tratando de añadir

    const oferta = newListaOfertas.find((el) => el.Id === obj.Id);

    // reducimos la cantidad de disponibles en una unidad
    if (oferta.Disponibles > 0 && oferta.Reservadas > 1) {
      oferta.Disponibles -= cant;
      oferta.Reservadas += cant;
    }

    this.props.location.state.listaOfertas = newListaOfertas;
    this.setState({});

    //console.log("Añadido item " + obj.Cod);
  };

  removeItem = (oferta) => {
    oferta.Reservadas = 0;
    this.setState({});
  };

  render() {
    const { usuario, lan } = this.props;
    const { listaOfertas } = this.props.location.state;

    return !usuario ? (
      <Redirect to={"/login"}></Redirect>
    ) : (
      <React.Fragment>
        <div className="row">
          <div className="bg-info col-12 col-md-12 m-0 text-center ">
            <h1>Carrito</h1>
          </div>
        </div>

        {listaOfertas.map((oferta) => {
          return oferta.Reservadas ? (
            <ItemOferta
              usuario={usuario}
              lan={lan}
              oferta={oferta}
              key={oferta.Id}
              handleClick={this.AddtoCart}
              handleDelete={this.removeItem}
              blnEsCarrito={true}
            ></ItemOferta>
          ) : null;
        })}
        <div className="row">
          <div className="bg-secondary col-12 col-md-12 m-0 text-center ">
            <h1>Datos del Pedido</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Carrito;
