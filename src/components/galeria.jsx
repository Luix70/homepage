import React, { Component } from "react";
import ThumbnailGallery from "./thumbnailGalery";
import Slider from "./slider";
import Fullscreen from "./fullscreen";
import MaterialIcon from "react-google-material-icons";
import { getImages } from "./../services/datosWeb";
import t from "./galeria.lit.json";

class Galeria extends Component {
  state = {
    listaImagenes: null,
    verGaleria: true,
    modo: "carousel",
    currentImage: null
  };
  componentDidMount = async () => {
    const { col } = this.props;
    const listaImagenes = await getImages(col.mod);
    this.setState({ listaImagenes });
  };

  toggleVisibility = () => {
    return this.setState({ verGaleria: !this.state.verGaleria });
  };

  zoomImage = img => {
    this.setState({ currentImage: img });
  };

  toggleMode = modo => {
    this.setState({ modo });
  };

  closePicture = () => {
    this.setState({ currentImage: null });
  };

  render() {
    const { listaImagenes, verGaleria, modo } = this.state;
    const { col, lan, modoEdit, usuario } = this.props;
    const defaultButtonStyle = "btn btn-white pl-4 ";



    return listaImagenes ? (
      <div className="row">
        {modoEdit ? (
          <div className="col-12 bg-danger text-light">
            <span>Editar</span>
          </div>
        ) : null}
        <div className="col-12 bg-light">
          <div
            className={
              "btn-group btn-group-sm float-right " +
              (verGaleria ? "d-flex" : "d-none")
            }
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className={
                defaultButtonStyle + (modo === "module" ? " disabled" : null)
              }
              onClick={() => this.toggleMode("module")}
            >
              <MaterialIcon icon="view_module" size={24} />
            </button>
            <button
              type="button"
              className={
                defaultButtonStyle + (modo === "carousel" ? " disabled" : null)
              }
              onClick={() => this.toggleMode("carousel")}
            >
              <MaterialIcon icon="view_carousel" size={24} />
            </button>
          </div>
          <div
            className="btn-group btn-group-sm float-left "
            role="group"
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

        <div className={(verGaleria ? " col-12 row bg-light p-0 m-0" : "d-none")}>
          {modo === "module" ? (
            <ThumbnailGallery
              col={col}
              listaImagenes={listaImagenes}
              handleClick={this.zoomImage}
              usuario={usuario}
            />
          ) : null}

          {modo === "carousel" ? (
            <Slider col={col} imgs={listaImagenes} />
          ) : null}
        </div>
        {this.state.currentImage ? (
          <Fullscreen
            img={this.state.currentImage}
            lan={lan}
            handleClosePicture={this.closePicture}
          />
        ) : null}
      </div>
    ) : null;
  }
}

export default Galeria;
