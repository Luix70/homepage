import React, { Component } from "react";
import SeccionGrupo from "./seccionGrupo";
import SeccionMedia from "./seccionMedia";
import SeccionTecnico from "./seccionTecnico";
import SeccionOpciones from "./seccionOpciones";
import SeccionDescargas from "./seccionDescargas";
class Secciones extends Component {
  render() {
    const { secciones, lan, coleccion, BSBreak } = this.props;
    const folder = `/resources/img/${coleccion}/`;

    if (!secciones) return null;

    return (
      <React.Fragment>
        <div className="row mb-5 ">
          {/* <div className="col-12 bg-danger text-light mt-5">
            <span>Añadir Seccion</span>
          </div> */}
        </div>

        {secciones.map(sec => {
          switch (sec.tipo) {
            case "media":
              return (
                <div className="row mb-5" key={secciones.indexOf(sec)}>
                  <SeccionMedia
                    seccion={sec}
                    lan={lan}
                    folder={folder}
                    BSBreak={BSBreak}
                  ></SeccionMedia>
                </div>
              );

            case "grupo":
              return (
                <div className="row mb-5" key={secciones.indexOf(sec)}>
                  <SeccionGrupo
                    seccion={sec}
                    lan={lan}
                    folder={folder}
                    BSBreak={BSBreak}
                  ></SeccionGrupo>{" "}
                </div>
              );

            case "tecnico":
              return (
                <div className="row mb-5" key={secciones.indexOf(sec)}>
                  <SeccionTecnico
                    seccion={sec}
                    lan={lan}
                    folder={folder}
                    BSBreak={BSBreak}
                  ></SeccionTecnico>
                </div>
              );
            case "opciones":
              return (
                <div className="row mb-5" key={secciones.indexOf(sec)}>
                  <SeccionOpciones
                    seccion={sec}
                    lan={lan}
                    folder={folder}
                    BSBreak={BSBreak}
                  ></SeccionOpciones>
                </div>
              );
            case "descargas":
              return (
                <div className="row mb-5" key={secciones.indexOf(sec)}>
                  <SeccionDescargas
                    seccion={sec}
                    lan={lan}
                    folder={folder}
                    BSBreak={BSBreak}
                  ></SeccionDescargas>
                </div>
              );
            default:
              return null;
          }
        })}
      </React.Fragment>
    );
  }
}

export default Secciones;
