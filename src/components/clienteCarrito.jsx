import React, { Component } from "react";

import Direccion from "./direccion";

class ClienteCarrito extends Component {
  state = {};

  render() {
    const { datosCliente, usuario, lan } = this.props;
    const direccionActiva =
      datosCliente.DireccionesEnvio.find(
        (el) => el.Codsucursal === datosCliente.DirEnvio
      ) || datosCliente.DirFacturacion;

    //console.log(datosCliente);
    return (
      <div className="bg-light row ">
        <div className="col-12 bg-info text-center ">
          <h4>Datos Pedido</h4>
        </div>
        <form className="w-100 p-4">
          {/* <div className="row ">
            <div className="col-12 col-md-12 col-lg-3">
              <div className="row mb-2">
                <div className="col-3 col-sm-3 ">
                  <label
                    className="font-weight-bold m-0 pt-2"
                    htmlFor="CodCliente"
                  >
                    Cod
                  </label>
                </div>
                <div className="col-9 col-sm-9">
                  <input
                    type="text"
                    className="form-control-plaintext"
                    id="CodCliente"
                    placeholder={datosCliente.CodCliente}
                    readOnly
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
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-12 col-md-12 col-lg-3">
              <div className="row mb-2">
                <div className="col-3 col-sm-3 ">
                  <label className="font-weight-bold m-0 pt-2" htmlFor="Cif">
                    Cif
                  </label>
                </div>
                <div className="col-9 col-sm-9">
                  <input
                    type="text"
                    className="form-control-plaintext"
                    id="Cif"
                    placeholder={datosCliente.Cif}
                    readOnly
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
                    placeholder={
                      datosCliente.Nombrecomercial || datosCliente.Rzs
                    }
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div> */}

          <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
              <Direccion
                direccion={datosCliente.DirFacturacion}
                usuario={usuario}
                lan={lan}
                nombre={datosCliente.Rzs}
                predet={false}
                cif={datosCliente.Cif}
              ></Direccion>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <Direccion
                direccion={direccionActiva}
                usuario={usuario}
                lan={lan}
                nombre={datosCliente.Nombrecomercial || datosCliente.Rzs}
                predet={
                  direccionActiva.Codsucursal === datosCliente.Direccion_predet
                }
                cif={datosCliente.Cif}
              ></Direccion>
            </div>
          </div>

          <div className="row pt-4 border-top">
            <div className="col-12 col-md-12 col-lg-6">
              <div className="row mb-2">
                <div className="col-12 col-sm-3 ">
                  <label
                    className="font-weight-bold m-0 pt-2"
                    htmlFor="FormaPago"
                  >
                    Entrega
                  </label>
                </div>
                <div className="col-12 col-sm-9">
                  <input
                    type="text"
                    className="form-control-plaintext "
                    id="FormaPago"
                    placeholder="Agencia: 20 Sept 2020 - Cliente: 25 Sept 2020"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-12 col-lg-6">
              <div className="row mb-2">
                <div className="col-12 col-sm-3 ">
                  <label
                    className="font-weight-bold m-0 pt-2"
                    htmlFor="FormaPago"
                  >
                    FormaPago
                  </label>
                </div>
                <div className="col-12 col-sm-9">
                  <input
                    type="text"
                    className="form-control-plaintext"
                    id="FormaPago"
                    placeholder={datosCliente.FormaPago}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-12 col-lg-6">
              <div className="row mb-2">
                <div className="col-12 col-sm-3 ">
                  <label
                    className="font-weight-bold m-0 pt-2"
                    htmlFor="Observaciones"
                  >
                    Observaciones
                  </label>
                </div>
                <div className="col-12 col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="Observaciones"
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-12 col-lg-6">
              <div className="row mb-2">
                <div className="col-12 col-sm-3 ">
                  <label
                    className="font-weight-bold m-0 pt-2"
                    htmlFor="Referencia"
                  >
                    Referencia
                  </label>
                </div>
                <div className="col-12 col-sm-9">
                  <input type="text" className="form-control" id="Referencia" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12 d-flex justify-content-around">
              <span className="btn-block"> </span>
              <button type="button" className="btn btn-success btn-block">
                Realizar Pedido
              </button>
              <span className="btn-block"> </span>
              <button type="button" className="btn btn-danger btn-block">
                Cancelar
              </button>
              <span className="btn-block"> </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ClienteCarrito;
