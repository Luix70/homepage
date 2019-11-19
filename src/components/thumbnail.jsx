import React from "react";
import MaterialIcon from "react-google-material-icons";
const ThumbNail = props => {
  const { imagen, col, handleClick } = props;
  return (
    <div
      key={imagen.nombre_tn}
      className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0"
    >
      <img
        className={"w-100"}
        src={"/resources/img/" + col.mod + "/" + imagen.nombre_tn}
        alt={col.mod}
      />
      <div
        className="float-right m-0 p-0 iconOverlay"
        onClick={() => handleClick(imagen.nombre_tn)}
      >
        <MaterialIcon className="m-0 p-0" icon="fullscreen" size={48} />
      </div>
    </div>
  );
};

export default ThumbNail;
