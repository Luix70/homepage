import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark encabezado">
      <div className="navbar-brand mr-3">
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
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={"/"}>
              Colecciones
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/"}>
              Area Usuario
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/"}>
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
