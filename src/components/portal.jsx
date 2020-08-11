/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import t from "./portal.lit.json";
class Portal extends Component {
  state = {};
  render() {
    const { lan } = this.props;
    return (
      <div className="d-flex mt-5 ">
        <div className="row m-0 p-0 w-100 justify-content-around ">
          <div className="col-11 col-sm-8 col-md-6 col-xl-4 m-0 px-2">
            <h1 className="text-center">{t.TI[lan]}</h1>
            <hr />
          </div>
          <div className="row mt-3 mx-4">
            <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <div className="card text-center p-4 h-100">
                <img
                  src="/resources/img/Customer.png"
                  className="card-img-top img-fluid h-50"
                  alt=""
                />
                <div className="card-block">
                  <h3 className="card-title text-center">Ficha Cliente</h3>

                  <p className="card-text text-center">
                    Datos de Facturación, representante, cambio de contraseña..
                    etc
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <div className="card text-center p-4 h-100">
                <img
                  src="/resources/img/Documents.png"
                  className="card-img-top img-fluid h-50"
                  alt=""
                />
                <div className="card-block">
                  <h3 className="card-title text-center">Operaciones</h3>

                  <p className="card-text text-center ">
                    Datos de Facturación, representante, cambio de contraseña..
                    etc
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <div className="card text-center p-4 h-100">
                <img
                  src="/resources/img/Ventas.png"
                  className="card-img-top img-fluid h-50"
                  alt=""
                />
                <div className="card-block">
                  <h3 className="card-title text-center">Ofertas Flash</h3>

                  <p className="card-text text-center">
                    Datos de Facturación, representante, cambio de contraseña..
                    etc
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <div className="card text-center p-4 h-100">
                <img
                  src="/resources/img/catalog.png"
                  className="card-img-top img-fluid h-50"
                  alt=""
                />
                <div className="card-block">
                  <h3 className="card-title text-center">Documentacion</h3>

                  <p className="card-text text-center">
                    Datos de Facturación, representante, cambio de contraseña..
                    etc
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Portal;
