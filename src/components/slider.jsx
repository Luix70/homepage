import React, { Component } from "react";
import { Link } from "react-router-dom";
import httpService from "../services/httpService";
import config from "../config.json";

class Slider extends Component {
  state = { listaColecciones: [] };
  componentDidMount = async () => {
    const apiEndpoint = config.apiEndPoint;
    const { data: colecciones } = await httpService.get(
      apiEndpoint + "/Colecciones/web"
    );
    this.setState({ listaColecciones: colecciones });
    console.log(this.state.listaColecciones);
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
                className={index === 0 ? "active" : null}
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
                  <h1>
                    <Link to={"/coleccion/" + col.mod}>{col.mod}</Link>
                  </h1>
                  <h5 className="text-dark">{col.tags["es"]}</h5>
                </div>

                <div className="carousel-caption  d-sm-block semitrans elevado">
                  <p className=" text-dark">{col.desc["es"]}</p>
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
