import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import getClientes, { getRepres } from "../services/clientes";
import ListaRepresentantes from "./listaRepresentantes";
import ListGroup from "./common/listGroup";

class AreaReservada extends Component {
  state = {
    resultConsulta: null,
    listaRepresentantes: [],
    FechaConsulta: "",
    selectedRepre: -1,
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

    if (this.state.listaRepresentantes.length === 1) {
      this.handleListGroupClick({ codrep: 0 });
    } else {
      this.handleListGroupClick({ codrep: -1 });
    }
  }

  render() {
    const { usuario, lan } = this.props;

    if (this.state.listaRepresentantes === []) return null;

    return (
      <React.Fragment>
        {!usuario ? <Redirect to={"/login"}></Redirect> : null}
        <div className="row">
          {this.state.listaRepresentantes.length > 1 ? (
            <div className="col-12">
              <ListGroup
                onItemSelect={this.handleListGroupClick}
                itemList={this.state.listaRepresentantes}
                itemId="codrep" //identificador del elemento
                itemValue="nombre" // valor que se mostrará
                selectedItem={this.state.selectedRepre}
                lan={lan}
              />
            </div>
          ) : null}

          {!this.state.resultconsulta ? (
            <div className="col-12">
              <ListaRepresentantes
                resultConsulta={this.state.resultConsulta}
                lan={lan}
              />
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default AreaReservada;
