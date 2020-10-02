/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
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

  AddtoCart = (obj, cant) => {
    const { listaOfertas } = this.state;

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
    const { listaOfertas } = this.state;

    if (!listaOfertas.length) {
      return <Redirect to={"/ofertas"}></Redirect>;
    }
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
           col-4 col-md-2 m-0 p-0 text-center d-flex align-items-center justify-content-center"
          >
            <Link
              to={
                totalReservadas
                  ? {
                      pathname: "/carrito",
                      state: {
                        listaOfertas: listaOfertas.filter(
                          (el) => el.Reservadas
                        ),
                      },
                    }
                  : { pathname: "/ofertas" }
              }
            >
              <button
                type="button"
                className="btn btn-outline-light border-0 p-0 "
              >
                <MaterialIcon icon="shopping_cart" size={36} />
              </button>
            </Link>

            <span className="badge badge-secondary p-2 d-flex flex-column justify-items-between align-items-center">
              <h3>{totalReservadas}</h3>
            </span>
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
              blnEsCarrito={false}
            ></ItemOferta>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Ofertas;
