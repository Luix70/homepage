import React, { Component } from "react";
import t from "./dashCliente.lit.json";
import { Link, Redirect } from "react-router-dom";
import { getDatosCliente } from "../services/clientes";
import FichaCliente from "./common/fichaCliente";
import { apiDataEndPoint } from "../config.json";
import { toast } from "react-toastify";
import http from "../services/httpService";

class DashCliente extends Component {
  state = { datosCliente: {} };
  async componentDidMount() {
    this.setState({
      datosCliente: await getDatosCliente(this.props.usuario.AccesoCli),
      usuario: this.props.usuario,
    });
  }

  handleCurrency = (cur, event) => {
    const usuario = this.state.usuario;
    usuario.Moneda = cur.toUpperCase();
    this.setState({ usuario });
    //console.log(`Quueremos la moneda ${cur}`);
    event.preventDefault();
  };

  handleLanguage = (lan, event) => {
    const usuario = this.state.usuario;
    usuario.Idioma = lan.toUpperCase();
    this.setState({ usuario });
    this.props.AppLanguage(lan);
    //console.log(`Queremos el idioma ${lan.toUpperCase()}`);
    event.preventDefault();
  };

  handleChange = ({ currentTarget: input }) => {
    if (!isNaN(input.value)) {
      const usuario = this.state.usuario;
      usuario.FactorPVP = input.value;
      this.setState({ usuario });
      //console.log(`queremos establecer el valor del pvp en ${input.value}`);
    } else {
      //console.log(`${input.value} no es un numero válido`);
    }
  };

  savePreferences = async () => {
    //console.log(apiDataEndPoint + "login/authenticate/", this.state.data);
    const { lan } = this.props;
    const token = sessionStorage.getItem("apiToken");
    try {
      const { data } = await http.post(
        apiDataEndPoint + "customers/savePrefs",
        this.state.usuario,
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 30000,
        }
      );

      console.log(data);
      
      if (data === "OK") {
        toast.success(t.TOAST_SUCCESS[lan]);
      } else {
        toast.error(t.TOAST_FAIL[lan]);
      }
    } catch (error) {
      toast.error(t.TOAST_FAIL[lan]);
    }
  };

  render() {
    const { lan, usuario } = this.props;
    const { datosCliente } = this.state;
    //console.log(this.state.datosCliente, usuario);
    if (!usuario) return <Redirect to="/login"></Redirect>;

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
            savePreferences={this.savePreferences}
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
