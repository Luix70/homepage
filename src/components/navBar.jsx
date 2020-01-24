/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FlagIcon from "./common/FlagIcon";
import MaterialIcon from "react-google-material-icons";
import t from "./navBar.lit.json";
import CollectionsDropDown from "./common/collectionsDropDown.jsx";

const NavBar = props => {
  const {
    lan,
    handleLanguage,
    usuario,
    handleLogout,
    cols,
    toggleEdit,
    modoEdit,
    windowWidth
  } = props;

  // const { windowWidth, windowHeight, BSBreak } = props;
  // console.log(windowWidth, windowHeight, BSBreak);

  if (lan === "") {
    // console.log("no renderizo");
    return null;
  }
  //console.log("renderizo");

  function clickLogo() {
    console.log("logo clicked");
  }

  function showInfo() {
    if (usuario) {
      toast.info(
        `${usuario.NombreUsuario} (${t.TU[usuario.TipoEntidad][lan]})`
      );
    } else {
      toast.error("El usuario no está identificado");
    }
  }

  function userStyle(badgeUser) {
    const baseBadgeStyle = "badge badge-pill mr-2 mt-0 py-2 ";
    const userKnownBadgeStyle = " badge-info";
    const userUnknownBadgeStyle = " badge-light";

    return badgeUser
      ? baseBadgeStyle + userKnownBadgeStyle
      : baseBadgeStyle + userUnknownBadgeStyle;
  }

  return (
    <div className="row w-100 mx-0 bg-dark d-flex">
      <nav className="navbar navbar-expand-md navbar-dark  w-100  align-items-center justify-content-between">
        <div className="navbar-brand position-relative ml-1">
          <object
            type="image/svg+xml"
            data="/resources/img/logoIndesan.svg"
            className="logo"
            aria-label="logo"
            style={{ height: "30px" }}
            onClick={clickLogo}
          ></object>
        </div>
        <button
          className="navbar-toggler mr-3"
          type="button"
          data-toggle="collapse"
          data-target="#toggler"
          aria-controls="toggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between align-items-center"
          id="toggler"
        >
          <div className="navbar-nav  ">
            <div className="nav-item pr-0">
              <CollectionsDropDown
                label={t.COL[lan]}
                cols={cols}
              ></CollectionsDropDown>
            </div>
            <div
              data-toggle={windowWidth <= 768 ? "collapse" : ""}
              data-target="#toggler"
              aria-controls="toggler"
            >
              <Link className="nav-link" to={"/contact"}>
                {t.CON[lan]}
              </Link>
            </div>

            {usuario ? (
              <React.Fragment>
                <div
                  className="nav-item"
                  data-toggle={windowWidth <= 768 ? "collapse" : ""}
                  data-target="#toggler"
                  aria-controls="toggler"
                >
                  <Link className="nav-link" to={"/ar"}>
                    {t.AU[lan]}
                  </Link>
                </div>
                <div
                  className="nav-item"
                  data-toggle={windowWidth <= 768 ? "collapse" : ""}
                  data-target="#toggler"
                  aria-controls="toggler"
                >
                  <Link className="nav-link" to={"#"} onClick={handleLogout}>
                    {t.LO[lan]}
                  </Link>
                </div>
              </React.Fragment>
            ) : (
              <div
                className="nav-item"
                data-toggle={windowWidth <= 768 ? "collapse" : ""}
                data-target="#toggler"
                aria-controls="toggler"
              >
                <Link className="nav-link" to={"/login"}>
                  {t.LI[lan]}
                </Link>
              </div>
            )}
          </div>

          <div
            className="nav-item  idiomas d-flex justify-content-end align-items-center"
            data-toggle={windowWidth <= 768 ? "collapse" : ""}
            data-target="#toggler"
            aria-controls="toggler"
          >
            <Link to={"#"} onClick={showInfo} className={userStyle(usuario)}>
              <MaterialIcon icon="person" size={24} />
            </Link>

            {usuario && usuario.TipoEntidad === "WM" ? (
              <Link
                to={"#"}
                onClick={toggleEdit}
                className={
                  modoEdit
                    ? "badge badge-pill mr-2 mt-0 p-1 badge-danger"
                    : "badge badge-pill mr-2 mt-0 p-1 badge-light"
                }
              >
                <MaterialIcon icon="edit" className="text-light" size={16} />
              </Link>
            ) : null}

            <div className="dropdown mr-2 ">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {lan}
              </button>
              <div
                className="dropdown-menu dropdown-menu-right "
                aria-labelledby="dropdownMenuButton"
                data-toggle={windowWidth <= 768 ? "collapse" : ""}
                data-target="#toggler"
                aria-controls="toggler"
              >
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleLanguage("es")}
                >
                  <FlagIcon code="es" /> Español
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleLanguage("en")}
                >
                  <FlagIcon code="gb" /> English
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleLanguage("fr")}
                >
                  <FlagIcon code="fr" /> Français
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
