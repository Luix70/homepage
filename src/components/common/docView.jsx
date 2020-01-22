import React, { Component } from "react";
import MaterialIcon from "react-google-material-icons";

class DocView extends Component {
  state = {};
  render() {
    const { tipo, ruta, onClick, td, cd } = this.props;
    return (
      <button
        onClick={() => onClick(ruta, tipo, td, cd)}
        className="btn btn-outline  d-flex"
      >
        <MaterialIcon icon="picture_as_pdf" size={20}></MaterialIcon>
        {tipo}
      </button>
    );
  }
}

export default DocView;
