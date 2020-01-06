import React from "react";

const Slider = props => {
  const { imgs } = props;
  //console.log(imgs);
  return (
    <div className="col-12 p-0 m-0">
      <div
        id="carousel_"
        className="carousel slide p-0 m-0"
        data-ride="carousel"
        data-interval="5000"
      >
        <ol className="carousel-indicators">
          {imgs.map(img => {
            const i = imgs.indexOf(img);

            return (
              <li
                key={i}
                data-target="#carousel_"
                data-slide-to={i}
                className={
                  i === 0 ? "slider-indicator active" : "slider-indicator"
                }
              ></li>
            );
          })}
        </ol>

        <div className="carousel-inner">
          {imgs.map(img => {
            const i = imgs.indexOf(img);

            return (
              <div
                className={
                  "carousel-item max-vh-100 " + (i === 0 ? "active" : "")
                }
                key={i}
              >
                <img
                  className="img-fluid"
                  src={"/resources/img/" + img.folder + "/" + img.nombre_img}
                  alt={"slide " + i}
                />
              </div>
            );
          })}
        </div>
        <a
          className="carousel-control-prev"
          href="#carousel_"
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
          href="#carousel_"
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
    </div>
  );
};

export default Slider;
