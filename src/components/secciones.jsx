import React, { Component } from "react";
import SeccionGrupo from "./seccionGrupo";
import SeccionMedia from "./seccionMedia";
import SeccionTecnico from "./seccionTecnico";
import SeccionOpciones from "./seccionOpciones";
class Secciones extends Component {
  render() {
    const { secciones, lan, coleccion } = this.props;

    if (!secciones) return null;

    return (
      <React.Fragment>
        <div className="row ">
          <div className="col-12 bg-danger text-light">
            <span>Añadir Seccion</span>
          </div>
        </div>

        {secciones.map(sec => {
          switch (sec.tipo) {
            case "grupo":
              return (
                <div className="row" key={secciones.indexOf(sec)}>
                  <SeccionGrupo seccion={sec} lan={lan}></SeccionGrupo>{" "}
                </div>
              );
            case "media":
              return (
                <div className="row" key={secciones.indexOf(sec)}>
                  <SeccionMedia
                    seccion={sec}
                    lan={lan}
                    folder={`/resources/img/${coleccion}/`}
                  ></SeccionMedia>
                </div>
              );
            case "tecnico":
              return (
                <div className="row" key={secciones.indexOf(sec)}>
                  <SeccionTecnico seccion={sec} lan={lan}></SeccionTecnico>
                </div>
              );
            case "opciones":
              return (
                <div className="row" key={secciones.indexOf(sec)}>
                  <SeccionOpciones seccion={sec} lan={lan}></SeccionOpciones>
                </div>
              );
            case "descargas":
              return (
                <div className="row" key={secciones.indexOf(sec)}>
                  <div className="col-12 ">Descarga</div>
                </div>
              );
            default:
              return (
                <div className="row" key={secciones.indexOf(sec)}>
                  <div className="col-12 ">desconocido</div>
                </div>
              );
          }
        })}
      </React.Fragment>
    );
  }
}

export default Secciones;
