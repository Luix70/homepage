import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getColecciones } from "../services/datosWeb";

class Slider extends Component {
  state = { listaColecciones: [] };
  componentDidMount = async () => {
    this.setState({ listaColecciones: await getColecciones() });
  };
  render() {
    const cols = this.state.listaColecciones;
    return (
      <div
        id="carouselColecciones"
        className="carousel slide  min-vh-100"
        data-ride="carousel"
      >
        <ol className="carousel-indicators elevado">
          {cols.map(col => {
            const index = cols.indexOf(col);
            return (
              <li
                key={index}
                data-target="#carouselColecciones"
                data-slide-to={index}
                className={index === 0 ? "selector active" : "selector"}
              >
                {col.mod}
              </li>
            );
          })}
        </ol>
        <div className="carousel-inner min-vh-100">
          {cols.map(col => {
            const index = cols.indexOf(col);
            const baseStyle = "carousel-item min-vh-100 hero-image";
            return (
              <div
                key={index}
                className={index === 0 ? baseStyle + " active" : baseStyle}
                style={{
                  backgroundImage: "url(/resources/img/" + col.thumbnail + ")"
                }}
              >
                <div className="hero w-100">
                  <h1>{col.mod}</h1>
                  <h5 className="text-dark">{col.tags["es"]}</h5>
                </div>

                <div className="carousel-caption  d-sm-block semitrans elevado">
                  <p className=" text-dark">{col.desc["es"]}</p>
                  <Link
                    className="btn btn-outline-primary "
                    to={"/coleccion/" + col.mod}
                  >
                    Ver coleccion
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselColecciones"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>

        <a
          className="carousel-control-next"
          href="#carouselColecciones"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

export default Slider;
