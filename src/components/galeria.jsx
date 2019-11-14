import React, { Component } from "react";
import { getImages } from "./../services/datosWeb";

class Galeria extends Component {
  state = { listaImagenes: null };
  componentDidMount = async () => {
    const { col } = this.props;
    const listaImagenes = await getImages(col.mod);
    this.setState({ listaImagenes });
    console.log(this.state.listaImagenes);
  };

  render() {
    const { listaImagenes } = this.state;
    const { col } = this.props;
    return listaImagenes ? (
      <div className="row col-12 px-0 mx-0">
        {listaImagenes.map(imagen => (
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 px-0 mx-0">
            <img
              className={"w-100"}
              key={imagen.nombre_tn}
              src={"/resources/img/" + col.mod + "/" + imagen.nombre_tn}
              alt={col.mod}
            />
          </div>
        ))}
      </div>
    ) : null;
  }
}

export default Galeria;
