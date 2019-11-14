import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar navbar-expand-sm navbar-dark bg-dark encabezado">
      <div className="navbar-header mr-5">
        <Link to="/">
          <object
            type="image/svg+xml"
            data="/resources/img/logoIndesan.svg"
            className="logo"
            aria-label="logo"
            style={{ height: "30px" }}
          ></object>
        </Link>
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
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Colecciones
            </a>
          </li>
          <li className="nav-item">
            <object
              type="image/svg+xml"
              data="/resources/img/logoIndesan_animated.svg"
              className="logo"
              aria-label="logo"
            ></object>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
