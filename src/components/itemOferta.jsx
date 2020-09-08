import React, { Component } from "react";
import MaterialIcon from "react-google-material-icons";

class ItemOferta extends Component {
  state = {};
  render() {
    const { lan, oferta } = this.props;
    return (
      <div className=" m-3 my-4 row py-3">
        <div className="col-2 ">
          <img
            src={"/resources/img/" + oferta.Imagen}
            className="w-100 rounded-circle"
            alt="Imagen"
          />
        </div>
        <div className="col-1 d-flex justify-content-center text-center align-items-center">
          <h3 key={oferta.Id}>{oferta.Cod}</h3>
        </div>
        <div className="col-6 border-right border-muted d-flex flex-column justify-content-center">
          <p className="text-info text-center">{oferta.Desc[lan]}</p>
          <p className="text-muted small font-italic text-center">
            {oferta.Desc2[lan]}
          </p>
        </div>

        <div className="col-2 border-right border-muted text-center  d-flex flex-column justify-content-center">
          <p className="text-info mb-0">Disponibles</p>
          <h4 className="text-info mb-3"> {oferta.Disponibles}</h4>
          {/* <p className="text-muted mb-0">Precio</p> */}
          <h6 className="text-danger">
            {oferta.Precios[0].Precio} {oferta.Precios[0].Moneda}
          </h6>
        </div>
        <div className="col-1  d-flex justify-content-center align-items-center">
          <MaterialIcon icon="add_shopping_cart" size={48} />
        </div>
      </div>
    );
  }
}

export default ItemOferta;
