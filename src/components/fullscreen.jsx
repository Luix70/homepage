import React from "react";
import MaterialIcon from "react-google-material-icons";
import t from "./fullscreen.lit.json";
const Fullscreen = props => {
  const { img, lan, handleClosePicture } = props;
  const defaultButtonStyle = "btn btn-light pl-4 ";
  return (
    <div className="full-image col-12 fixed-top p-0 m-0">
      <div className="row bg-light">
        <div
          className="btn-group btn-group-sm float-left "
          role="group"
          aria-label="Basic example"
        >
          <button
            onClick={handleClosePicture}
            type="button"
            className={defaultButtonStyle + "d-flex"}
          >
            <MaterialIcon icon="visibility_off" size={24} />
            <p className="ml-2 mb-0">{t.OI[lan]}</p>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="row">
          <div className="col-12">
            <img
              className="flex-image min-vh-100 min-vw-100 vw-100 "
              src={"/resources/img/" + img.folder + "/" + img.nombre_img}
              alt={img.nombre_img}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fullscreen;
