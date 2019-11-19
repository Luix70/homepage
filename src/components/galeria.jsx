import React, { Component } from "react";
import { getImages } from "./../services/datosWeb";
import MaterialIcon from "react-google-material-icons";
import t from "./galeria.lit.json";
import ThumbNail from "./thumbnail";
class Galeria extends Component {
  state = { listaImagenes: null, verGaleria: true };
  componentDidMount = async () => {
    const { col } = this.props;
    const listaImagenes = await getImages(col.mod);
    this.setState({ listaImagenes });
    //console.log(this.state.verGaleria);
  };

  toggleVisibility = () => {
    return this.setState({ verGaleria: !this.state.verGaleria });
  };

  getBootstrapBreakpoint = () => {
    var w =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    return w < 768 ? "xs" : w < 992 ? "sm" : w < 1200 ? "md" : "lg";
  };

  zoomImage = img => {
    console.log(img);
  };
  render() {
    const { listaImagenes, verGaleria } = this.state;
    const { col, lan } = this.props;
    const defaultButtonStyle = "btn btn-light p-0 ";

    return listaImagenes ? (
      <div className="row col-12 px-0 mx-0">
        <div className="col-12 pr-2 py-2 mx-0 bg-light">
          &nbsp;
          <div
            className={
              "btn-group btn-group-sm float-right " +
              (verGaleria ? "d-flex" : "d-none")
            }
            role="group"
            aria-label="Basic example"
          >
            <button type="button" className={defaultButtonStyle}>
              <MaterialIcon icon="view_module" size={24} />
            </button>
            <button type="button" className={defaultButtonStyle}>
              <MaterialIcon icon="view_carousel" size={24} />
            </button>
            <button type="button" className={defaultButtonStyle}>
              <MaterialIcon icon="photo" size={24} />
            </button>
          </div>
          <div
            className="btn-group btn-group-sm float-left "
            role="group"
            aria-label="Basic example"
          >
            <button
              onClick={this.toggleVisibility}
              type="button"
              className={
                defaultButtonStyle + (!verGaleria ? "d-flex" : "d-none")
              }
            >
              <MaterialIcon icon="visibility" size={24} />
              <p className="ml-2 mb-0 pb-0">{t.VG[lan]}</p>
            </button>
            <button
              onClick={this.toggleVisibility}
              type="button"
              className={
                defaultButtonStyle + (verGaleria ? "d-flex" : "d-none")
              }
            >
              <MaterialIcon icon="visibility_off" size={24} />
              <p className="ml-2 mb-0">{t.OG[lan]}</p>
            </button>
          </div>
        </div>
        <div className={"row " + (verGaleria ? "d-flex" : "d-none")}>
          {listaImagenes.map(imagen => (
            <ThumbNail
              key={imagen.nombre_tn}
              imagen={imagen}
              col={col}
              handleClick={this.zoomImage}
            />
          ))}
        </div>
      </div>
    ) : null;
  }
}

export default Galeria;
