/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import t from "./preferencias.lit.json";
import { Link } from "react-router-dom";
import FlagIcon from "./FlagIcon";


const Preferencias = (props) => {
  const { lan, usuario , handleChange, handleCurrency, handleLanguage,savePreferences} = props;
  return (
    <div className="col-12">
      {/* Zona de actualizacion: contraseña, valor punto PVP... etc */}
      <div className="form-group d-flex justify-content-center border-bottom">
        <label className="h3">{t.PRE[lan]}</label>
      </div>

      <div className="my-3 mx-0 row py-3 ">
        {/* Valor del punto PVP */}
        <div className="input-group  p-1  mb-3 col-12 col-md-4">
          <div className="input-group-prepend col-6 m-0 p-0">
            <button
              className="btn btn-outline-secondary col-12 p-0  text-right pr-1"
              type="button"
            >
              {t.VPP[lan]}
            </button>
          </div>
          <input
            type="text"
            className="form-control h-100"
            value={usuario.FactorPVP}
            onChange={handleChange}
          />
        </div>

        {/* Selector de Precio */}
        <div className="input-group  p-1 mb-3 col-12 col-md-4">
          <div className="input-group-prepend col-6 m-0 p-0">
            <button
              className="btn btn-outline-secondary dropdown-toggle col-12 p-0  text-right pr-1"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {t.ME[lan]}
            </button>
            <div className="dropdown-menu">
              <a
                className="dropdown-item"
                href="#"
                onClick={(ev) => handleCurrency("EUR", ev)}
              >
                {t.EUR.DE[lan]}
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={(ev) => handleCurrency("PUN", ev)}
              >
                {t.PUN.DE[lan]}
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={(ev) => handleCurrency("PVP", ev)}
              >
                {t.PVP.DE[lan]}
              </a>
            </div>
          </div>
          <input
            type="text"
            className="form-control h-100 "
            aria-label="Text input with dropdown button"
            placeholder={usuario.Moneda}
            readOnly
          />
        </div>
        {/* Selector de Idioma */}
        <div className="input-group p-1 mb-3 col-12 col-md-4">
          <div className="input-group-prepend col-6 m-0 p-0">
            <button
              className="btn btn-outline-secondary dropdown-toggle col-12 p-0 text-right pr-1"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {t.ID[lan]}
            </button>
            <div className="dropdown-menu">
              <a
                className="dropdown-item"
                href="#"
                onClick={(ev) => handleLanguage("es", ev)}
              >
                <FlagIcon code="es" /> Español
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={(ev) => handleLanguage("en", ev)}
              >
                <FlagIcon code="gb" /> English
              </a>
              <a
                className="dropdown-item"
                href="#"
                onClick={(ev) => handleLanguage("fr", ev)}
              >
                <FlagIcon code="fr" /> Français
              </a>
            </div>
          </div>
          <input
            type="text"
            className="form-control h-100"
            aria-label="Text input with dropdown button"
            placeholder={usuario.Idioma}
            readOnly
          />
        </div>
        <div className="mt-4 d-flex justify-content-center col-12">
          <button className="btn btn-outline-primary mb-3" onClick={savePreferences}>{t.VD[lan]}</button>
        </div>

        {/* Fin de la zona de Actualizacion */}
      </div>

      <div className="d-flex align-items-center justify-content-center ">
        {/* Boton Cambio Contraseña */}
        <Link to="/newPass" className="btn btn-primary">
          {t.CC[lan]}
        </Link>
      </div>
    </div>
  );
};

export default Preferencias;
