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
      usuario: this.props.usuario,
    });
  }

   handleCurrency = (cur, event) => {
    console.log(`Quueremos la moneda ${cur}`);
    event.preventDefault();
  };
  
   handleLanguage = (lan, event) => {
    console.log(`Quueremos el idioma ${lan}`);
    event.preventDefault();
  };
  
   handleChange = ({ currentTarget: input }) => {
    console.log(`queremos establecer el vlor del pvp en ${input.value}`);
  };

  render() {
    const { lan, usuario } = this.props;
    const { datosCliente } = this.state;
    //console.log(this.state.datosCliente, usuario);
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
          <FichaCliente
            datosCliente={datosCliente}
            lan={lan}
            usuario={usuario}
            handleCurrency={this.handleCurrency}
            handleChange={this.handleChange}
            handleLanguage={this.handleLanguage}
          ></FichaCliente>
        </div>
        <div className="d-flex justify-content-center my-3 mx-5">
          <Link
            to="/ar"
            className="btn btn-outline-primary d-flex align-items-center justify-content-center"
          >
            {t.DT[lan]}
          </Link>
        </div>
      </div>
    );
  }
}

export default DashCliente;
