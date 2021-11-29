/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Preferencias from "./preferencias";
import DatosCliente from "./datosCliente";
import DatosRepresentante from "./datosRepresentante";

const FichaCliente = (props) => {
  const {
    datosCliente,
    lan,
    usuario,
    handleChange,
    handleCurrency,
    handleLanguage,
    savePreferences
  } = props;
  return (
    <div className="row">
      <DatosCliente datosCliente={datosCliente} lan={lan}></DatosCliente>

      <DatosRepresentante
        datosCliente={datosCliente}
        lan={lan}
      ></DatosRepresentante>

      <Preferencias
        datosCliente={datosCliente}
        lan={lan}
        usuario={usuario}
        handleCurrency={handleCurrency}
        handleChange={handleChange}
        handleLanguage={handleLanguage}
        savePreferences={savePreferences}
      ></Preferencias>
    </div>
  );
};

export default FichaCliente;
