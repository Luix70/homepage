import React, { Component } from "react";
import Articulo from "./articulo";
class SeccionGrupo extends Component {
  render() {
    const { seccion, lan, folder } = this.props;
    //console.log(seccion, lan);
    return !seccion ? null : (
      <React.Fragment>
        <div className="col-12 text-center mb-3">
          <h3>{seccion.titulo[lan].toUpperCase()}</h3>
        </div>
        {seccion.articulos.map(art => (
          <div className="col-12" key={art}>
            <Articulo art={art} lan={lan} folder={folder}></Articulo>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default SeccionGrupo;
