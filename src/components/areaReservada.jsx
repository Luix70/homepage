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
    return (
      <React.Fragment>
        {!usuario ? <Redirect to={"/login"}></Redirect> : null}
        <div className="row">
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
          <ListaRepresentantes resultConsulta={this.state.resultConsulta} />
        </div>
      </React.Fragment>
    );
  }
}

export default AreaReservada;
