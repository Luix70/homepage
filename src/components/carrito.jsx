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
    const { listaOfertas } = this.location.state;

    //hacemos copia de los objetos del estado a fin de actualizarlos luego
    const newListaOfertas = [...listaOfertas];

    //obtenemos una referencia a la oferta que estamos tratando de añadir

    const oferta = newListaOfertas.find((el) => el.Id === obj.Id);

    // reducimos la cantidad de disponibles en una unidad
    if (oferta.Disponibles > 0) {
      oferta.Disponibles -= cant;
      oferta.Reservadas += cant;
    }
    this.setState({ listaOfertas: newListaOfertas });

    //console.log("Añadido item " + obj.Cod);
  };

  render() {
    const { usuario, lan } = this.props;
    const { listaOfertas } = this.props.location.state;

    return !usuario ? (
      <Redirect to={"/login"}></Redirect>
    ) : (
      <React.Fragment>
        {listaOfertas.map((oferta) => {
          return oferta.Reservadas ? (
            <ItemOferta
              usuario={usuario}
              lan={lan}
              oferta={oferta}
              key={oferta.Id}
              handleClick={this.AddtoCart}
              blnEsCarrito={true}
            ></ItemOferta>
          ) : null;
        })}
      </React.Fragment>
    );
  }
}

export default Carrito;
