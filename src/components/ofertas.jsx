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

  render() {
    const { usuario, lan } = this.props;
    const { listaOfertas } = this.state;
    return !usuario ? (
      <Redirect to={"/login"}></Redirect>
    ) : (
      <React.Fragment>
        <div className="bg-secondary row">
          <div className="bg-info col-8 col-md-10 m-0 text-center ">
            <h1>Filtro</h1>
          </div>
          <div
            className="bg-danger
           col-4 col-md-2 m-0 p-0 text-center d-flex align-items-center justify-content-around"
          >
            <MaterialIcon icon="shopping_cart" size={36} />

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
