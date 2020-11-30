import React, { Component } from "react";
class Direccion extends Component {
  state = {};
  render() {
    const { direccion, nombre, predet, cif } = this.props;
    //console.log(direccion, usuario, lan, nombre, predet);
    return (
      <div className={"row border-top " + (predet ? "bg-light text-dark" : "")}>
        <div className="col-12 col-sm-12">
          <h4>
            {direccion.Codsucursal === 0
              ? "Direccion de Facturacion"
              : "Direccion de Envío"}
          </h4>
        </div>

        <div className="col-12 col-sm-12">
          <input
            type="text"
            className="form-control-plaintext"
            id="CodCliente"
            placeholder={
              direccion.Codsucursal === 0 ? nombre : direccion.NombreSucursal
            }
            readOnly
          />
        </div>
        {direccion.Codsucursal === 0 ? (
          <React.Fragment>
            <div className="col-3 col-sm-3 ">
              <label className="font-weight-bold m-0 pt-2" htmlFor="CodCliente">
                Cif
              </label>
            </div>
            <div className="col-9 col-sm-9">
              <input
                type="text"
                className="form-control-plaintext"
                id="CodCliente"
                placeholder={cif}
                readOnly
              />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="col-12 col-sm-3 ">
              <label className="font-weight-bold m-0 pt-2" htmlFor="CodCliente">
                {" "}
              </label>
            </div>
            <div className="col-12 col-sm-9">
              <input
                type="text"
                className="form-control-plaintext"
                id="CodCliente"
                readOnly
              />
            </div>
          </React.Fragment>
        )}
        <div className="col-12 col-sm-12">
          <input
            type="text"
            className="form-control-plaintext"
            id="CodCliente"
            placeholder={direccion.Direccion}
            readOnly
          />
        </div>
        <div className="col-12 col-sm-12">
          <input
            type="text"
            className="form-control-plaintext"
            id="CodCliente"
            placeholder={direccion.Poblacion}
            readOnly
          />
        </div>
        <div className="col-3 col-sm-3 ">
          <input
            type="text"
            className="form-control-plaintext"
            id="CodCliente"
            placeholder={direccion.Codpostal}
            readOnly
          />
        </div>
        <div className="col-9 col-sm-9">
          <input
            type="text"
            className="form-control-plaintext"
            id="CodCliente"
            placeholder={direccion.Provincia}
            readOnly
          />
        </div>

        <div className="col-3 col-sm-3 ">
          <label className="font-weight-bold m-0 pt-2" htmlFor="CodCliente">
            Tel
          </label>
        </div>
        <div className="col-9 col-sm-9">
          <input
            type="text"
            className="form-control-plaintext"
            id="CodCliente"
            placeholder={direccion.Telef}
            readOnly
          />
        </div>

        <div className="col-3 col-sm-3 ">
          <label className="font-weight-bold m-0 pt-2" htmlFor="CodCliente">
            e-mail
          </label>
        </div>
        <div className="col-9 col-sm-9">
          <input
            type="text"
            className="form-control-plaintext"
            id="CodCliente"
            placeholder={direccion.Email}
            readOnly
          />
        </div>

        {direccion.Codsucursal === 0 ? null : (
          <React.Fragment>
            <div className="col-12 col-sm-12 ">
              <label className="font-weight-bold m-0 pt-2" htmlFor="CodCliente">
                Observaciones
              </label>
            </div>
            <div className="col-12 col-sm-12">
              <input
                type="text"
                className="form-control-plaintext"
                id="CodCliente"
                readOnly
                placeholder={direccion.Observaciones}
              />
            </div>
            <div className="col-12 col-sm-12 ">
              <label className="font-weight-bold m-0 pt-2" htmlFor="CodCliente">
                Agencia
              </label>
            </div>
            <div className="col-12 col-sm-12">
              <input
                type="text"
                className="form-control-plaintext"
                id="CodCliente"
                readOnly
                placeholder={direccion.Agencia}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Direccion;
