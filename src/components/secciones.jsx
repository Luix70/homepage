import React, { Component } from "react";
import SeccionGrupo from "./seccionGrupo";
import SeccionMedia from "./seccionMedia";
class Secciones extends Component {
  render() {
    const { secciones, lan, coleccion } = this.props;

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
                <div className="row">
                  <SeccionGrupo
                    seccion={sec}
                    lan={lan}
                    key={secciones.indexOf(sec)}
                  ></SeccionGrupo>{" "}
                </div>
              );
            case "media":
              return (
                <div className="row">
                  <SeccionMedia
                    seccion={sec}
                    lan={lan}
                    key={secciones.indexOf(sec)}
                    folder={`/resources/img/${coleccion}/`}
                  ></SeccionMedia>
                </div>
              );
            case "tecnico":
              return (
                <div className="row">
                  <div className="col-12 " key={secciones.indexOf(sec)}>
                    Técnico
                  </div>
                </div>
              );
            case "opciones":
              return (
                <div className="row">
                  <div className="col-12 " key={secciones.indexOf(sec)}>
                    Opciones
                  </div>
                </div>
              );
            case "descargas":
              return (
                <div className="row">
                  <div className="col-12 " key={secciones.indexOf(sec)}>
                    Descarga
                  </div>
                </div>
              );
            default:
              return (
                <div className="row">
                  <div className="col-12 " key={secciones.indexOf(sec)}>
                    desconocido
                  </div>
                </div>
              );
          }
        })}
      </React.Fragment>
    );
  }
}

export default Secciones;
