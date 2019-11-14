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
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          {cols.map(col => {
            const index = cols.indexOf(col);
            const baseStyle = "carousel-item vh-100 min-vh-100 hero-image";
            return (
              <div
                key={index}
                className={index === 0 ? baseStyle + " active" : baseStyle}
                style={{
                  backgroundImage: "url(/resources/img/" + col.thumbnail + ")"
                }}
              >
                <div className="hero w-100">
                  <Link to={"/coleccion/" + col.mod}>
                    <h1 className="display-3 text-uppercase">{col.mod}</h1>{" "}
                  </Link>
                  <h4 className="text-dark lead ">{col.tags["es"]}</h4>
                </div>

                <div className="carousel-caption d-sm-inline-block semitrans elevado p-3 pb-4">
                  <p className=" text-dark font-italic">{col.desc["es"]}</p>
                  <Link
                    className="btn btn-outline-info "
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
