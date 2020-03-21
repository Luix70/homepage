import React, { Component } from "react";
import t from "./dashCliente.lit.json";
import { Link, Redirect } from "react-router-dom";
import { getDatosCliente } from "../services/clientes";
import FichaCliente from "./common/fichaCliente";
class DashCliente extends Component {
  state = { datosCliente: {} };
  async componentDidMount() {
    this.setState({
      datosCliente: await getDatosCliente(this.props.usuario.AccesoCli),
      usuario: this.props.usuario
    });
  }

  render() {
    const { lan, usuario } = this.props;
    const { datosCliente } = this.state;
    console.log(this.state.datosCliente, usuario);
    return (
      <div>
        {!usuario ? <Redirect to={"/login"}></Redirect> : null}
        <div className="d-flex justify-content-center my-3 mx-5">
          <Link
            to="/ar"
            className="btn btn-outline-primary  d-flex align-items-center justify-content-center"
          >
            {t.DT[lan]}
          </Link>
        </div>
        <div className="d-flex justify-content-center mt-3 mx-5 ">
          <FichaCliente datosCliente={datosCliente} lan={lan}></FichaCliente>
        </div>
        <div className="d-flex justify-content-center my-3 mx-5">
          <Link
            to="/ar"
            className="btn btn-outline-primary  d-flex align-items-center justify-content-center"
          >
            {t.DT[lan]}
          </Link>
        </div>
      </div>
    );
  }
}

export default DashCliente;
