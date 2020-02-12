import React, { Component } from "react";
import MaterialIcon from "react-google-material-icons";
import t from "./buscador.lit.json";
class Buscador extends Component {
  state = { expandido: false, criterio: "", enCurso: false, facturados: true };
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

  render() {
    const { expandido, enCurso, facturados } = this.state;
    const { lan } = this.props;
    return (
      <div className="row">
        <div
          onClick={this.onExpand}
          className="col-12 d-flex justify-content-around "
          style={{ cursor: "pointer", backgroundColor: "rgba(200,200,200,1)" }}
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
          className={
            "col-12 py-2   " +
            (expandido ? "d-flex justify-content-around" : "d-none")
          }
          style={{ backgroundColor: "rgba(200,200,200,1)" }}
        >
          <div>
            <div className="custom-control custom-switch py-3">
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
            <div className="custom-control custom-switch">
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
          <div className="bg-danger">&nbsp;</div>
          <div className="bg-info">&nbsp;</div>
        </div>
      </div>
    );
  }
}

export default Buscador;
