import React, { Component } from "react";
class Secciones extends Component {
  state = { secciones: [], lan: "" };
  componentDidMount = () => {
    this.setState({ secciones: this.props.secciones, lan: this.props.lan });
  };
  render() {
    const { secciones } = this.state;

    return (
      <React.Fragment>
        <div className="row ">
          <div className="col-12 bg-dark text-light">
            <span>Añadir Seccion</span>
          </div>
        </div>
        <div className="row ">
          {secciones.map(sec => {
            switch (sec.tipo) {
              case "grupo":
                return <div className="col-12 ">Grupo</div>;
              case "media":
                return <div className="col-12 ">Media</div>;
              case "tecnico":
                return <div className="col-12 ">Técnico</div>;
              case "opciones":
                return <div className="col-12 ">Opciones</div>;
              case "descargas":
                return <div className="col-12 ">Descarga</div>;
              default:
                return <div className="col-12 ">desconocido</div>;
            }
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Secciones;
