import React, { Component } from "react";
import MaterialIcon from "react-google-material-icons";
class Buscador extends Component {
  state = { expandido: true, criterio: "", enCurso: true, facturados: true };
  onExpand = () => {
    const exp = !this.state.expandido;
    this.setState({ expandido: exp });
  };
  render() {
    const { expandido } = this.state;
    return (
      <div className="row">
        <div className="col-12">
          <div
            className="d-flex align-items-center p-0 m-0"
            onClick={this.onExpand}
          >
            <span className="ml-3">Búsqueda</span>
            <MaterialIcon
              icon={expandido ? "expand_less" : "expand_more"}
              size={36}
            ></MaterialIcon>
          </div>
        </div>
        <div
          className={"col-12 bg-info p-5 " + (expandido ? "d-block" : "d-none")}
        >
          &nbsp;
        </div>
      </div>
    );
  }
}

export default Buscador;
