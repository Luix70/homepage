import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import getClientes, { getRepres } from "../services/clientes";
import ListaRepresentantes from "./listaRepresentantes";
import ListGroup from "./common/listGroup";
import $ from "jquery";
import t from "./areaReservada.lit.json";

class AreaReservada extends Component {
  state = {
    resultConsulta: null,
    listaRepresentantes: [],
    FechaConsulta: "",
    selectedRepre: -1,
    usuario: null,
  };
  handleListGroupClick = async (repre) => {
    this.mostrarProgress(true);

    setTimeout(async () => {
      const lr = await getClientes(repre);
      this.setState({
        resultConsulta: lr,
        selectedRepre: repre.codrep,
        FechaConsulta: lr.FechaConsulta,
      });
      this.mostrarProgress(false);
    }, 100);
  };

  mostrarProgress = (mostrar) => {
    if (!mostrar) {
      $("#progBar").removeClass("d-block").addClass("d-none");
      //console.log("hide");
    } else {
      $("#progBar").removeClass("d-none").addClass("d-block");
      // console.log("show");
    }
  };

  async componentDidMount() {
    this.setState({
      listaRepresentantes: await getRepres(),
      usuario: this.props.usuario,
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
        <div
          className="progress d-block"
          id="progBar"
          style={{ width: "100%", height: "40px" }}
        >
          <div
            className="progress-bar progress-bar-striped progress-bar-danger-animated bg-danger "
            style={{ width: "100%", height: "40px" }}
          >
            <h6>{t.PA[lan]}</h6>
          </div>
        </div>
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
                usuario={usuario}
              />
            </div>
          ) : null}

          {!this.state.resultconsulta ? (
            <div className="col-12">
              <ListaRepresentantes
                resultConsulta={this.state.resultConsulta}
                lan={lan}
                usuario={usuario}
              />
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default AreaReservada;
