import React from "react";
import ThumbNail from "./thumbnail";
const ThumbnailGallery = props => {
  const { listaImagenes, col, handleClick } = props;
  return listaImagenes.map(imagen => (
    <ThumbNail
      key={imagen.nombre_tn}
      imagen={imagen}
      col={col}
      handleClick={handleClick}
    />
  ));
};

export default ThumbnailGallery;
