/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import MaterialIcon from "react-google-material-icons";
import t from "./itemOferta.lit.json";
class ItemOferta extends Component {
  state = {};
  render() {
    const { lan, oferta, usuario, handleClick } = this.props;

    const precio = oferta.Precios.filter((of) => {
      return of.Tarifa === usuario.Tarifa;
    })[0];
    //console.log(precio);
    return (
      <div className=" m-3 my-4 row py-3 border-bottom border-muted">
        <div className="col-8 col-sm-2 d-flex align-items-center p-4">
          <img
            src={"/resources/img/" + oferta.Imagen}
            className="w-100 rounded-circle"
            alt="Imagen"
          />
        </div>
        <div className="col-4 col-sm-1 d-flex justify-content-center text-center align-items-center">
          <h3 key={oferta.Id}>{oferta.Cod}</h3>
        </div>
        <div className="col-12 col-sm-6  d-flex flex-column justify-content-center">
          <p className="text-info text-center">{oferta.Desc[lan]}</p>
          <p className="text-muted small font-italic text-center">
            {oferta.Desc2[lan]}
          </p>
        </div>

        <div className="col-8 col-sm-2  text-center  d-flex flex-column justify-content-center">
          <p className="text-info mb-0">{t.DI[lan]}</p>
          <h4 className="text-info mb-3"> {oferta.Disponibles}</h4>
          {/* <p className="text-muted mb-0">Precio</p> */}
          <h6 className="text-danger">
            {precio.Precio} {precio.Moneda}
          </h6>
        </div>
        <div className="col-4 col-sm-1  d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn btn-outline-dark border-0 p-0 "
            onClick={() => handleClick(oferta)}
          >
            <MaterialIcon icon="add_shopping_cart" size={48} />
          </button>
        </div>
      </div>
    );
  }
}

export default ItemOferta;
