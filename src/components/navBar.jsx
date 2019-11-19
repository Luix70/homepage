import React from "react";
import { Link } from "react-router-dom";
import t from "./navBar.lit.json";

const NavBar = props => {
  const { lan, handleLanguage } = props;
  //console.log(lan, t, t.COL[lan]);

  if (lan === "") {
    // console.log("no renderizo");
    return null;
  }
  //console.log("renderizo");

  function badgeStyle(badgeLan) {
    const baseBadgeStyle = "badge badge-pill mr-2 mt-2 py-2 ";
    const activBadgeStyle = "badge-secondary";
    const inactivBadgeStyle = "badge-light";
    return lan === badgeLan
      ? baseBadgeStyle + activBadgeStyle
      : baseBadgeStyle + inactivBadgeStyle;
  }

  return (
    <div className="row w-100 mx-0 bg-dark">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark w-100">
        <div className="navbar-brand">
          <object
            type="image/svg+xml"
            data="/resources/img/logoIndesan.svg"
            className="logo"
            aria-label="logo"
            style={{ height: "30px" }}
          ></object>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#toggler"
          aria-controls="toggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="toggler">
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
            <div className="nav-item  position-absolute idiomas">
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
