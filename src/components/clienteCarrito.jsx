import React, { Component } from "react";

class ClienteCarrito extends Component {
  state = {};

  render() {
    const { datosCliente } = this.props;
    console.log(datosCliente);
    return (
      <div className="bg-light row ">
        <div className="col-12 bg-info text-center ">
          <h1>Datos Cliente</h1>
        </div>
        <form className="w-100 py-4 px-4 mx-4">
          <div className="row ">
            <div className="col-12 col-md-12 col-lg-3">
              <div className="row mb-2">
                <div className="col-12 col-sm-3 ">
                  <label
                    className="font-weight-bold m-0 pt-2"
                    htmlFor="CodCliente"
                  >
                    Cod
                  </label>
                </div>
                <div className="col-12 col-sm-9">
                  <input
                    type="text"
                    className="form-control-plaintext"
                    id="CodCliente"
                    placeholder={datosCliente.CodCliente}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-9">
              <div className="row mb-2">
                <div className="col-12 col-sm-3">
                  <label className="font-weight-bold m-0 pt-2" htmlFor="Rzs">
                    R. Social
                  </label>
                </div>
                <div className="col-12 col-sm-9">
                  <input
                    type="text"
                    className="form-control-plaintext"
                    id="Rzs"
                    placeholder={datosCliente.Rzs}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-12 col-md-12 col-lg-3">
              <div className="row mb-2">
                <div className="col-12 col-sm-3 ">
                  <label className="font-weight-bold m-0 pt-2" htmlFor="Cif">
                    Cif
                  </label>
                </div>
                <div className="col-12 col-sm-9">
                  <input
                    type="text"
                    className="form-control-plaintext"
                    id="Cif"
                    placeholder={datosCliente.Cif}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-9">
              <div className="row mb-2">
                <div className="col-12 col-sm-3">
                  <label
                    className="font-weight-bold m-0 pt-2"
                    htmlFor="NombreComercial"
                  >
                    N. Comercial
                  </label>
                </div>
                <div className="col-12 col-sm-9">
                  <input
                    type="text"
                    className="form-control-plaintext"
                    id="NombreComercial"
                    placeholder={datosCliente.Nombrecomercial}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ClienteCarrito;
