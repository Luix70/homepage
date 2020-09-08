import React, { Component } from "react";
import MaterialIcon from "react-google-material-icons";

class DocView extends Component {
  state = {};
  render() {
    const {
      //estado,
      tipo,
      codTipo,
      ruta,
      onClick,
      td,
      cd,
      lan,
      usuario,
    } = this.props;
    // console.log(estado, codTipo, usuario.AccesoDocumentos, usuario.verPrecios);
    if (!usuario.AccesoDocumentos.includes(codTipo.toString())) {
      return null;
    }
    return (
      <button
        onClick={() => onClick(ruta, tipo, td, cd, lan)}
        className="btn btn-outline px-1 mx-1 py-0"
      >
        <MaterialIcon icon="picture_as_pdf" size={40}></MaterialIcon>
      </button>
    );
  }
}

export default DocView;
