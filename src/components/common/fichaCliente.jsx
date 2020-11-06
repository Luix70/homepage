import React from "react";
import t from "./fichaCliente.lit.json";
import { Link } from "react-router-dom";

const FichaCliente = (props) => {
  const { datosCliente, lan } = props;
  return (
    <form>
      <div className="form-group d-flex justify-content-center border-bottom">
        <label className="h3">{t.FC[lan]}</label>
      </div>
      <div className="form-group">
        <label htmlFor="inputRzs">{t.RS[lan]}</label>
        <input
          type="text"
          className="form-control"
          id="inputRzs"
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
      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="inputCIF">{t.CF[lan]}</label>
          <input
            type="text"
            className="form-control"
            id="inputCIF"
            placeholder={datosCliente.Cif}
            readOnly
          />
        </div>
        <div className="form-group col-md-8">
          <label htmlFor="inputemail">{t.EM[lan]}</label>
          <input
            type="text"
            className="form-control"
            id="inputemail"
            placeholder={datosCliente.Email}
            readOnly
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputTel">{t.TF[lan]}</label>
          <input
            type="text"
            className="form-control"
            id="inputTel"
            placeholder={datosCliente.Telef}
            readOnly
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputFax">{t.FX[lan]}</label>
          <input
            type="text"
            className="form-control"
            id="inputFax"
            placeholder={datosCliente.Fax}
            readOnly
          />
        </div>
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
      <div className="form-group">
        <label>
          <p className="small text-center font-italic text-info">{t.DC[lan]}</p>
        </label>
      </div>
      <div className="d-flex justify-content-around my-3 mx-0 ">
        <Link
          to="/newPass"
          className="btn btn-primary  d-flex align-items-center justify-content-center"
        >
          {t.CC[lan]}
        </Link>
      </div>
      <div className="form-group d-flex justify-content-center border-bottom">
        <label className="h3">{t.FR[lan]}</label>
      </div>
      <div className="form-group">
        <label htmlFor="nombrerep">{t.NR[lan]}</label>
        <input
          type="text"
          className="form-control"
          id="nombrerep"
          placeholder={datosCliente.NomRepresentante}
          readOnly
        />
      </div>
      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="telrep">{t.TF[lan]}</label>
          <input
            type="text"
            className="form-control"
            id="telrep"
            placeholder={datosCliente.TelRepresentante}
            readOnly
          />
        </div>
        <div className="form-group col-md-8">
          <label htmlFor="telrep">{t.EM[lan]}</label>
          <input
            type="text"
            className="form-control"
            id="telrep"
            placeholder={datosCliente.EmailRepresentante}
            readOnly
          />
        </div>
      </div>
    </form>
  );
};

export default FichaCliente;
