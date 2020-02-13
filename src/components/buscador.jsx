import React, { Component } from "react";
import MaterialIcon from "react-google-material-icons";
import t from "./buscador.lit.json";
class Buscador extends Component {
  state = {
    expandido: false,
    criterio: "",
    enCurso: true,
    facturados: true,
    tmpCriterio: ""
  };
  onExpand = () => {
    const exp = !this.state.expandido;
    this.setState({ expandido: exp });
  };

  toggleFacturados = () => {
    const facturados = !this.state.facturados;
    this.setState({ facturados });
  };

  toggleEnCurso = () => {
    const enCurso = !this.state.enCurso;
    this.setState({ enCurso });
  };
  setFilter = async () => {
    const criterio = this.state.tmpCriterio;

    await this.setState({ criterio, expandido: false });
    // console.log(this.state.criterio);
  };

  clearFilter = () => {
    this.setState({
      criterio: "",
      tmpCriterio: "",
      enCurso: true,
      facturados: true,
      expandido: false
    });
  };

  saveCriterio = async event => {
    const valor = event.target.value;

    await this.setState({ tmpCriterio: valor });
    //console.log(this.state.tmpCriterio);
  };

  render() {
    const { expandido, enCurso, facturados, criterio } = this.state;
    const { lan } = this.props;
    return (
      <div className="row">
        <div
          onClick={this.onExpand}
          className={
            "col-12 d-flex justify-content-around text-light " +
            (enCurso && facturados && criterio === ""
              ? "bg-secondary"
              : "bg-danger")
          }
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex align-items-center p-0 m-0">
            <span className="ml-3 lead">{t.BU[lan]}</span>
            <MaterialIcon
              icon={expandido ? "expand_less" : "expand_more"}
              size={36}
            ></MaterialIcon>
          </div>
        </div>

        <div
          className={"col-12    " + (expandido ? "d-block" : "d-none")}
          style={{ backgroundColor: "rgba(200,200,200,1)" }}
        >
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 px-5">
              <div className="custom-control custom-switch my-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitch1"
                  checked={enCurso}
                  onChange={this.toggleEnCurso}
                />
                <label className="custom-control-label" htmlFor="customSwitch1">
                  Pedidos en curso
                </label>
              </div>
              <div className="custom-control custom-switch  my-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitch2"
                  checked={facturados}
                  onChange={this.toggleFacturados}
                />
                <label className="custom-control-label" htmlFor="customSwitch2">
                  Pedidos finalizados
                </label>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 px-5">
              <div className="form-group my-3">
                <input
                  type="text"
                  className="form-control"
                  id="criterioBusq"
                  aria-describedby="criterioBusq"
                  placeholder="Criterio de búsqueda"
                  onChange={this.saveCriterio}
                  value={this.state.tmpCriterio}
                ></input>
                <small id="emailHelp" className="form-text text-muted">
                  Cliente, referencia de pedido, código de artículo ...
                </small>
              </div>
            </div>
            <div className="col-12 col-lg-4 px-5  d-flex justify-content-around align-items-center">
              <div className="form-group w-100 d-flex justify-content-around">
                <button
                  type="button"
                  className="btn btn-danger  "
                  onClick={this.setFilter}
                >
                  Aplicar Filtro
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.clearFilter}
                >
                  Quitar Fltro
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Buscador;
