import React from "react";
import t from "./fichaCliente.lit.json";

const FichaCliente = props => {
  const { datosCliente, lan } = props;
  return (
    <form>
      <div className="form-group">
        <label htmlFor="inputAddress">{t.RS[lan]}</label>
        <input
          type="text"
          className="form-control"
          id="inputAddress"
          placeholder={datosCliente.Rzs}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="nombreComercial">{t.NC[lan]}</label>
        <input
          type="text"
          className="form-control"
          id="nombreComercial"
          placeholder={datosCliente.Nombrecomercial}
          readOnly
        />
      </div>
      <div className="form-group">
        <label htmlFor="inputAddress">{t.AD[lan]}</label>
        <input
          type="text"
          className="form-control"
          id="inputAddress"
          placeholder={datosCliente.Direcc}
          readOnly
        />
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputCity">{t.CI[lan]}</label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            placeholder={datosCliente.Poblacion}
            readOnly
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="inputProv">{t.PR[lan]}</label>
          <input
            type="text"
            className="form-control"
            id="inputZip"
            placeholder={datosCliente.NomProvincia}
            readOnly
          />
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="inputProv">{t.CP[lan]}</label>
          <input
            type="text"
            className="form-control"
            id="inputZip"
            placeholder={datosCliente.Cp1}
            readOnly
          />
        </div>
      </div>
    </form>
  );
};

export default FichaCliente;
