import React from "react";
import MaterialIcon from "react-google-material-icons";
import t from "./direcciones.lit.json";
const Direcciones = props => {
  const { lan } = props;
  return (
    <React.Fragment>
      <object
        type="image/svg+xml"
        data="/resources/img/logoIndesan_animated.svg"
        className="logo w-100"
        aria-label="logo"
      ></object>

      <ul className="list-group list-group-inverse direccion  lead">
        {/* <li className="list-group-item bg-dark   border-0 py-0">
            CIF: B30403968{" "}
          </li> */}
        <li className="list-group-item bg-dark   border-0 py-0 d-flex align-items-center">
          <span className="mr-2 ">
            <MaterialIcon icon="location_city" size={16}></MaterialIcon>
          </span>
          <span>Ctra de Pinoso Km 2</span>
        </li>
        <li className="list-group-item bg-dark   border-0 py-0">
          <span className="ml-4"> {t.AD[lan]}</span>
        </li>
        <li className="list-group-item bg-dark   border-0 py-0 d-flex align-items-center">
          <span className="mr-2">
            <MaterialIcon icon="email" size={16}></MaterialIcon>
          </span>
          <span>
            <a
              href="mailto:indesan@indesan.com"
              className="nodecoration text-light"
            >
              indesan@indesan.com
            </a>
          </span>
        </li>
        <li className="list-group-item bg-dark   border-0 py-0 d-flex align-items-center">
          <span className="mr-2">
            <MaterialIcon icon="phone" size={16}></MaterialIcon>
          </span>
          <span>
            <a href={"tel:" + t.TE[lan]} className="nodecoration text-light">
              {t.TE[lan]}
            </a>
          </span>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Direcciones;
