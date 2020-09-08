import React from "react";
import MaterialIcon from "react-google-material-icons";
import { toast } from "react-toastify";
import t from "./fullscreen.lit.json";

const Fullscreen = props => {
  const { img, handleClosePicture, lan } = props;
  const defaultButtonStyle = "btn btn-light pl-4 d-block";
  return (
    <div className="col-12 fixed-top p-0 m-0 overflow-hidden max-vh-100 max-vw-100 vh-100 vw-100 overflow-hidden">
      <div className="row bg-light pt-5">
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
          <div
            className="btn-group btn-group-sm float-left iconOverlay"
            role="group"
          >
            <button
              onClick={handleClosePicture}
              type="button"
              className={defaultButtonStyle}
            >
              <MaterialIcon icon="fullscreen_exit" size={24} />
            </button>

            <button
              type="button"
              className={defaultButtonStyle}
              onClick={() => {
                toast.success(t.AD[lan] + img.nombre_img);
              }}
            >
              <a
                href={"/resources/img/" + img.folder + "/" + img.nombre_img}
                download
              >
                <MaterialIcon icon="cloud_download" size={24} />
              </a>
            </button>
          </div>
        </div>
      </div>

      <div className="row m-0 p-0 text-center full-screen-container overflow-hidden">
        <div className="col-12 m-0 p-0 position-relative vw-100 vh-100 ">
          <img
            className=" min-vw-100 w-100 text-center full-screen-image"
            src={"/resources/img/" + img.folder + "/" + img.nombre_img}
            alt={img.nombre_img}
          />
        </div>
      </div>
    </div>
  );
};

export default Fullscreen;
