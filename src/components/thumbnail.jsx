import React from "react";
import MaterialIcon from "react-google-material-icons";
const ThumbNail = props => {
  const { imagen, col, handleClick } = props;
  return (
    <div
      key={imagen.nombre_tn}
      className="col-xs-12 col-sm-6 col-md-4 col-lg-3  px-0 mx-0"
    >
      <img
        className={"w-100"}
        src={"/resources/img/" + imagen.folder + "/" + imagen.nombre_tn}
        alt={col.mod}
      />
      <div
        className="float-right m-0 p-0 pl-3 iconOverlay "
        onClick={() => handleClick(imagen)}
      >
        <MaterialIcon
          className="ml-2 float-right"
          icon="fullscreen"
          size={36}
        />
      </div>
    </div>
  );
};

export default ThumbNail;
