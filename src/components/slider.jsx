import React from "react";
import { Link } from "react-router-dom";
import t from "./slider.json";
const Slider = props => {
  const { listaColecciones: cols, lan } = props;
  // console.log(cols, lan);
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
                <h4 className="text-dark lead ">{col.tags[lan]}</h4>
              </div>

              <div className="carousel-caption d-sm-inline-block semitrans elevado p-3 pb-4">
                <p className=" text-dark font-italic">{col.desc[lan]}</p>
                <Link
                  className="btn btn-outline-info "
                  to={"/coleccion/" + col.mod}
                >
                  {t.VC[lan]}
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
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>

      <a
        className="carousel-control-next"
        href="#carouselColecciones"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Slider;
