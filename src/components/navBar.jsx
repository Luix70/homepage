import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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
    modoEdit
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

  function badgeStyle(badgeLan) {
    const baseBadgeStyle = "badge badge-pill mr-2 mt-0 py-2 ";
    const activBadgeStyle = " badge-secondary";
    const inactivBadgeStyle = " badge-light";

    return lan === badgeLan
      ? baseBadgeStyle + activBadgeStyle
      : baseBadgeStyle + inactivBadgeStyle;
  }

  function userStyle(badgeUser) {
    const baseBadgeStyle = "badge badge-pill mr-2 mt-0 py-2 ";
    const userKnownBadgeStyle = " badge-secondary";
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
          className="collapse navbar-collapse justify-content-around align-items-middle"
          id="toggler"
        >
          <div className="navbar-nav mr-auto ">
            <div className="nav-item">
              <CollectionsDropDown
                label={t.COL[lan]}
                cols={cols}
              ></CollectionsDropDown>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to={"/contact"}>
                {t.CON[lan]}
              </Link>
            </div>

            {usuario ? (
              <React.Fragment>
                <div className="nav-item">
                  <Link className="nav-link" to={"/ar"}>
                    {t.AU[lan]}
                  </Link>
                </div>
                <div className="nav-item">
                  <Link className="nav-link" to={"#"} onClick={handleLogout}>
                    {t.LO[lan]}
                  </Link>
                </div>
              </React.Fragment>
            ) : (
              <div className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  {t.LI[lan]}
                </Link>
              </div>
            )}
            {/* <div className="nav-item">
              <Link className="nav-link" to={"/"}>
                {windowWidth + " x " + windowHeight + " (" + BSBreak + ")"}
              </Link>
            </div> */}

            <div className="nav-item  idiomas  d-flex position-absolute align-items-center">
              <Link
                to={"#"}
                className={badgeStyle("es")}
                onClick={() => handleLanguage("es")}
              >
                ES
              </Link>
              <Link
                to={"#"}
                className={badgeStyle("en")}
                onClick={() => handleLanguage("en")}
              >
                EN
              </Link>
              <Link
                to={"#"}
                className={badgeStyle("fr")}
                onClick={() => handleLanguage("fr")}
              >
                FR
              </Link>
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
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
