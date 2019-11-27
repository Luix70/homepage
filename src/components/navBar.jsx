import React from "react";
import { Link } from "react-router-dom";
import t from "./navBar.lit.json";

const NavBar = props => {
  const { lan, handleLanguage, windowWidth, windowHeight, BSBreak } = props;
  //console.log(lan, t, t.COL[lan]);

  if (lan === "") {
    // console.log("no renderizo");
    return null;
  }
  //console.log("renderizo");

  function clickLogo() {
    console.log("logo clicked");
  }

  function badgeStyle(badgeLan) {
    const baseBadgeStyle = "badge badge-pill mr-2 mt-2 py-2 ";
    const activBadgeStyle = "badge-secondary";
    const inactivBadgeStyle = "badge-light";
    return lan === badgeLan
      ? baseBadgeStyle + activBadgeStyle
      : baseBadgeStyle + inactivBadgeStyle;
  }

  return (
    <div className="row w-100 mx-0 bg-dark d-flex clearfix">
      <nav className="navbar navbar-expand-md navbar-dark  w-100  align-items-left ">
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
          className="navbar-toggler burgerButton"
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
            <div className="nav-item active">
              <Link className="nav-link" to={"/"}>
                {t.COL[lan]}
              </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to={"/"}>
                {t.AU[lan]}
              </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to={"/"}>
                {t.CON[lan]}
              </Link>
            </div>

            <div className="nav-item">
              <Link className="nav-link" to={"/"}>
                {windowWidth + " x " + windowHeight + " (" + BSBreak + ")"}
              </Link>
            </div>

            <div className="nav-item  idiomas position-absolute">
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
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
