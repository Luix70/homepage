import React from "react";
import { Link } from "react-router-dom";
import t from "./collectionSlider.lit.json";
import { WhichBotstrapBreak } from "../utils/utilities.js";

const CollectionSlider = props => {
  const { listaColecciones: cols, lan, windowWidth, windowHeight } = props;
  const aspectRatio = windowWidth / windowHeight;
  //console.log(aspectRatio);

  return (
    <div className=" bg-light colsContainer"> 

     <div className="coleccionesIntro h-33 bg-white p-5 d-flex justify-content-center">
        <div className="col-12 col-md-6 text-center ">
          <img src='/resources/img/logoIndesan.svg' alt="" className="v-50 mb-3"/>  
          <h1>Colecciones</h1>
          <h4>Explora nuestra amplia selección de mesas de comedor modernas y elegantes.</h4>
        </div> 
        
     </div>

    <div
      id="carouselColecciones"
      className="carousel slide bg-white"
      data-ride="carousel"
      data-interval="10000"
    > <div className="mx-lg-5 mx-md-3 py-3">
            <div className="carousel-inner">
        {cols.map(col => {
          const index = cols.indexOf(col);
          const baseStyle = "carousel-item hero-image w-100";

          return (
            <div
              key={index}
              className={index === 0 ? baseStyle + " active" : baseStyle}
              style={{
                backgroundImage:
                  "url(/resources/img/" +
                  col.mod +
                  "/" +
                  col.thumbnail.replace(
                    ".jpg",
                    "_" + WhichBotstrapBreak(windowWidth, windowHeight) + ".jpg"
                  ) +
                  ")"
              }}
            >
              <div className="hero w-100 pt-0 ">
                <h4 className="text-dark lead mt-4 mb-0 px-5">
                  {col.tags[lan]}
                </h4>
                <Link to={"/coleccion/" + col.mod} className={"heroLink"}>
                  <h1 className="display-3 text-uppercase mt-0 pt-0">
                    {col.mod}
                  </h1>
                </Link>
              </div>

              <div className="carousel-caption d-sm-inline-block semitrans rounded px-5">
                {(aspectRatio > 1 && windowHeight > 399) ||
                (aspectRatio <= 1 && windowHeight > 500) ? (
                  <p className=" text-dark font-italic">{col.desc[lan]}</p>
                ) : null}
                 <Link className="btn-lg text-danger " to={"/coleccion/" + col.mod}>
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

    </div>



    </div>
      );
};

export default CollectionSlider;
