import React, { Component } from "react";
import t from "./dashCliente.lit.json";
import { Link, Redirect } from "react-router-dom";
import { getDatosCliente } from "../services/clientes";
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
    //console.log(this.state.datosCliente);
    return (
      <div className="d-flex justify-content-center mt-5 mx-5 ">
        {!usuario ? <Redirect to={"/login"}></Redirect> : null}
        <Link
          to="/ar"
          className="btn btn-outline-secondary  d-flex align-items-center justify-content-center"
        >
          {t.OP[lan]}
        </Link>
      </div>
    );
  }
}

export default DashCliente;
