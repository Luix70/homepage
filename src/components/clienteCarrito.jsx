import React, { Component } from "react";

class ClienteCarrito extends Component {
  state = {};

  render() {
    const { datosCliente } = this.props;

    return (
      <div className="bg-light row ">
        <div className="col-12 bg-info text-center ">
          <h1>Datos Cliente</h1>
        </div>

        <div className="d-flex justify-content-center col-12 pt-4">
          <div className="col-9">
            <form>
              <div className="form-row">
                <div className="form-group row  small">
                  <label
                    className="col-sm-2 col-form-label "
                    htmlFor="inputEmail4"
                  >
                    CIF
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="email"
                      className="form-control-plaintext"
                      id="inputEmail4"
                      value={datosCliente.Cif}
                    />
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress2">Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputCity">City</label>
                  <input type="text" className="form-control" id="inputCity" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputState">State</label>
                  <select id="inputState" className="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="inputZip">Zip</label>
                  <input type="text" className="form-control" id="inputZip" />
                </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ClienteCarrito;
