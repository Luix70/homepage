/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { getCustomer } from "../services/ofertas";
import ClienteCarrito from "./clienteCarrito";
import ItemOferta from "./itemOferta";

class Carrito extends Component {
  state = {};

  async componentDidMount() {
    const datosCliente = await getCustomer();

    const { listaOfertas } = this.props.location.state;

    this.setState({
      datosCliente,
      listaOfertas,
    });
  }

  AddtoCart = (obj, cant) => {
    let { listaOfertas } = this.state;

    //hacemos copia de los objetos del estado a fin de actualizarlos luego
    const newListaOfertas = [...listaOfertas];

    //obtenemos una referencia a la oferta que estamos tratando de añadir

    const oferta = newListaOfertas.find((el) => el.Id === obj.Id);

    // reducimos la cantidad de disponibles en una unidad
    if (
      (cant > 0 && oferta.Disponibles > 0) ||
      (cant < 0 && oferta.Reservadas > 1)
    ) {
      oferta.Disponibles -= cant;
      oferta.Reservadas += cant;
    }

    //listaOfertas = newListaOfertas;
    this.setState({});

    //console.log("Añadido item " + obj.Cod);
  };

  removeItem = (oferta) => {
    oferta.Disponibles += oferta.Reservadas;
    oferta.Reservadas = 0;
    this.setState({});
  };

  render() {
    if (!this.props.location.state) {
      return <Redirect to={"/ofertas"}></Redirect>;
    }
    const { usuario, lan } = this.props;
    const { listaOfertas } = this.props.location.state;
    const { datosCliente } = this.state;

    return !usuario ? (
      <Redirect to={"/login"}></Redirect>
    ) : !listaOfertas ||
      listaOfertas.length === 0 ||
      listaOfertas.reduce((acc, el) => acc + el.Reservadas, 0) === 0 ? (
      <Redirect to={"/ofertas"}></Redirect>
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
          <div className="bg-secondary col-12 col-md-12 m-0">
            {datosCliente && datosCliente.CodCliente !== "undefined" ? (
              <ClienteCarrito
                lan={lan}
                usuario={usuario}
                datosCliente={datosCliente}
              ></ClienteCarrito>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Carrito;
