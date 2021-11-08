import React, { Component } from "react";

import Direccion from "./direccion";

class ClienteCarrito extends Component {
  state = {};

  DireccionEnvio = () => {};

  render() {
    const {
      datosCliente,
      usuario,
      lan,
      cancelarPedido,
      realizarPedido,
      datosPedido,
      handleChange,
    } = this.props;

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
            <div className="col-12 col-md-12 col-lg-6 d-none">
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
                    placeholder={
                      direccionActiva.DescFormaPago +
                      (direccionActiva.Dto1 > 0
                        ? ` ( Dto1: ${direccionActiva.Dto1}%) `
                        : "") +
                      (direccionActiva.Dto2 > 0
                        ? ` ( Dto2: ${direccionActiva.Dto2}%) `
                        : "")
                    }
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-12 col-lg-6 d-none">
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
                    id="observaciones"
                    value={datosPedido.observaciones}
                    onChange={handleChange}
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
                  <input
                    type="text"
                    className="form-control"
                    id="referencia"
                    value={datosPedido.referencia}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12 d-flex justify-content-around">
              <span className="btn-block"> </span>
              <button
                type="button"
                className="btn btn-success btn-block"
                onClick={realizarPedido}
              >
                Realizar Pedido
              </button>
              <span className="btn-block"> </span>
              <button
                type="button"
                className="btn btn-danger btn-block"
                onClick={cancelarPedido}
              >
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
