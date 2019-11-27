import React, { Component } from "react";

class DocView extends Component {
  state = {};
  render() {
    const { tipo, ruta, onClick } = this.props;
    return (
      <div className="card" style={{ width: "11rem" }}>
        <img
          src={
            ruta.substring(ruta.length - 3, ruta.length) === "pdf"
              ? "/logoIndesan.jpg"
              : "/docindesan_min.jpg"
          }
          className="card-img-top"
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">{tipo}</h5>
          <p className="card-text"> </p>
          <button
            onClick={() => onClick(ruta, tipo)}
            className="btn btn-primary"
          >
            Descargar
          </button>
        </div>
      </div>
    );
  }
}

export default DocView;
