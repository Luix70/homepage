import React from "react";
import { Helmet } from "react-helmet";
const ColeccionMetaTags = props => {
  const { col, lan } = props;
  return (
    <div className="wrapper">
      <Helmet>
        <meta
          property="og:url"
          content="https://indesan.org/resources/staticViews/kepler.html"
        />

        <title>{"INDESAN. Coleccion " + col.mod.toUpperCase()}</title>
        <meta name="description" content={col.desc[lan]} />
        <meta property="og:description" content={col.desc[lan]} />
        <meta
          property="og:title"
          content={"INDESAN. Coleccion " + col.mod.toUpperCase()}
        />
        <meta
          property="og:image"
          content={
            "http://indesan.org/resources/img/" +
            col.mod +
            "/" +
            col.tec_thumbnail
          }
        />
        <meta
          property="og:image:secure_url"
          content={
            "https://indesan.org/resources/img/" +
            col.mod +
            "/" +
            col.tec_thumbnail
          }
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content={"INDESAN. Coleccion " + col.mod.toUpperCase()}
        />
        <meta
          property="og:url"
          content={"https://indesan.org/coleccion/" + col.mod}
        />
        <meta property="og:type" content="website" />
      </Helmet>
    </div>
  );
};

export default ColeccionMetaTags;
