import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import getClientes, { getRepres } from "../services/clientes";
import ListaRepresentantes from "./listaRepresentantes";
import MenuRepresentantes from "./menuRepresentantes";

class AreaReservada extends Component {
  state = {
    resultConsulta: null,
    listaRepresentantes: [],
    FechaConsulta: "",
    selectedRepre: 0,
    usuario: null
  };
  handleListGroupClick = async repre => {
    const lr = await getClientes(repre);

    this.setState({
      resultConsulta: lr,
      selectedRepre: repre.codrep,
      FechaConsulta: lr.FechaConsulta
    });
  };

  async componentDidMount() {
    this.setState({
      listaRepresentantes: await getRepres(),
      usuario: this.props.usuario
    });

    this.handleListGroupClick({ codrep: 0 });
  }

  render() {
    const { usuario } = this.props;
    console.log(this.state.listaRepresentantes);
    if (this.state.listaRepresentantes === []) return null;
    const repres = this.state.listaRepresentantes.length;
    const anchoLista = repres > 1 ? "col-12 col-lg-9" : "col-12";
    return (
      <React.Fragment>
        {!usuario ? <Redirect to={"/login"}></Redirect> : null}
        <div className="row">
          {this.state.listaRepresentantes.length > 1 ? (
            <div className="col-12 col-lg-3">
              <MenuRepresentantes
                onItemSelect={this.handleListGroupClick}
                listaRepresentantes={this.state.listaRepresentantes}
                selectedRepre={this.state.selectedRepre}
                FechaConsulta={this.state.FechaConsulta}
                FechaCache={
                  this.state.resultConsulta
                    ? this.state.resultConsulta.FechaCache
                    : ""
                }
              />
            </div>
          ) : null}

          {!this.state.resultconsulta ? (
            <div className={anchoLista}>
              <ListaRepresentantes resultConsulta={this.state.resultConsulta} />
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default AreaReservada;
