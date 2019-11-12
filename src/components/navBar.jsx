import React from "react";
const NavBar = () => {
  return (
    <div className="App container-fluid">
      <nav className="navbar navbar navbar-expand-sm navbar-dark bg-dark px-0">
        <div className="navbar-header">
          <a href="/" className="navbar-brand">
            INDESAN
          </a>
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
              <a class="nav-link" href="/">
                Colecciones
              </a>
            </li>
            <li className="nav-item">
              <a class="nav-link" href="/">
                Área Usuario
              </a>
            </li>
            <li className="nav-item">
              <a class="nav-link" href="/">
                Contacto
              </a>
            </li>
            <li className="nav-item">
              <a class="nav-link" href="/">
                Blog
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
