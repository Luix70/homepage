/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import MaterialIcon from "react-google-material-icons";
import t from "./itemOferta.lit.json";

class ItemOferta extends Component {
  state = {};

  render() {
    const { lan, oferta, usuario, handleClick, handleDelete, blnEsCarrito } =
      this.props;

    const { Moneda } = usuario;

    const precio = oferta.Precios.filter((of) => {
      let tar = usuario.Tarifa;

      if (Moneda === "PUN" || Moneda === "PVP") {
        tar = tar + "P";
      }

      return of.Tarifa === tar;
    })[0];

    const factor = Moneda === "EUR" || Moneda === "PUN" ? 1 : usuario.FactorPVP;

    return (
      <div className=" m-0 row p-0 border-bottom border-muted">
        <div className="col-8 col-sm-2 d-flex align-items-center p-2 m-0">
          <img
            src={
              oferta.Imagen
                ? "/resources/img/ofertas/" + oferta.Imagen
                : "/resources/img/NoImg.png"
            }
            className="w-100 rounded"
            alt="Imagen"
          />
        </div>
        <div className="col-4 col-sm-1 d-flex justify-content-center text-center align-items-center p-2 m-0">
          <h3 key={oferta.Id}>{oferta.Cod}</h3>
        </div>
        <div className="col-12 col-sm-6  d-flex flex-column justify-content-center p-2 m-0">
          <p className="text-info text-center">{oferta.Desc[lan]}</p>
          <p className="text-muted small font-italic text-center">
            {oferta.Desc2[lan]}
          </p>
        </div>

        <div className="col-8 col-sm-2  text-center  d-flex flex-column justify-content-center p-2 m-0">
          {!blnEsCarrito ? (
            <div>
              <p className="text-info mb-0">{t.DI[lan]}</p>
              <h4 className="text-info mb-3"> {oferta.Disponibles}</h4>
              <p className="text-muted mb-0">Precio Unitario</p>
              <h6 className="text-danger">
                {oferta.Dto ? (
                  <span>
                    <del className="text-secondary small">
                      {" "}
                      {(factor * precio.Precio).toFixed(2)}{" "}
                      {t[Moneda]["SI"][lan]}
                    </del>
                    <span> (-{oferta.Dto}%)</span>
                    <p className="bg-warning rounded-circle">
                      {(
                        precio.Precio *
                        (1 - oferta.Dto / 100) *
                        factor
                      ).toFixed(2)}{" "}
                      {t[Moneda]["SI"][lan]}
                    </p>
                  </span>
                ) : (
                  `${(factor * precio.Precio).toFixed(2)} ${
                    t[Moneda]["SI"][lan]
                  }`
                )}
              </h6>
            </div>
          ) : (
            <div>
              <p className="text-info mb-0">{t.RE[lan]}</p>
              <div className="d-flex justify-content-center align-items-center">
                <button
                  type="button"
                  className="btn btn-danger btn-sm p-0 m-0 mx-3 px-2 pb-1 btn-block "
                  onClick={() => handleClick(oferta, -1)}
                >
                  <span className="h4 text-monospace">-</span>
                </button>
                <span className="text-info  h2 text-center p-0 m-0">
                  {oferta.Reservadas}
                </span>
                <button
                  type="button"
                  className="btn btn-info btn-sm p-0 m-0 mx-3 px-2 pb-1 btn-block"
                  onClick={() => handleClick(oferta, 1)}
                >
                  <span className="h4 text-monospace">+</span>
                </button>
              </div>
              <p className="text-muted mb-0">Importe total</p>
              <h6 className="text-danger">
                {oferta.Dto ? (
                  <span>
                    <del className="text-secondary small">
                      {" "}
                      {(factor * precio.Precio * oferta.Reservadas).toFixed(
                        2
                      )}{" "}
                      {t[Moneda]["SI"][lan]}
                    </del>
                    <span> (-{oferta.Dto}%)</span>
                    <p className="bg-warning rounded-circle">
                      {(
                        factor *
                        precio.Precio *
                        oferta.Reservadas *
                        (1 - oferta.Dto / 100)
                      ).toFixed(2)}{" "}
                      {t[Moneda]["SI"][lan]}
                    </p>
                  </span>
                ) : (
                  `${(factor * precio.Precio * oferta.Reservadas).toFixed(2)} ${
                    t[Moneda]["SI"][lan]
                  }`
                )}
              </h6>
            </div>
          )}
        </div>
        <div className="col-4 col-sm-1 d-flex justify-content-center align-items-center p-2 m-0">
          {!blnEsCarrito ? (
            <button
              type="button"
              className="btn btn-outline-dark border-0 p-0 "
              onClick={() => handleClick(oferta, 1)}
            >
              <MaterialIcon icon="add_shopping_cart" size={48} />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-dark border-0 p-0 "
              onClick={() => handleDelete(oferta)}
            >
              <MaterialIcon icon="delete" size={48} />
            </button>
          )}
        </div>
        <div className="d-flex w-100 justify-content-center m-1">
          {!blnEsCarrito ? (
            oferta.Promo && oferta.Promo[lan] !== "" ? (
              <div className="d-flex w-80 text-danger justify-content-center rounded-circle text-center">
                <h3>{oferta.Promo[lan]}</h3>
              </div>
            ) : null
          ) : null}
        </div>
      </div>
    );
  }
}

export default ItemOferta;
