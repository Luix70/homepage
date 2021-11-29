import React from "react";
import t from "./fichaCliente.lit.json";

const DatosCliente = (props) => {
  const { datosCliente, lan } = props;
  return (
    <div className="col-12">
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
              id="inputProv"
              placeholder={datosCliente.NomProvincia}
              readOnly
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip">{t.CP[lan]}</label>
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
            <p className="small text-center font-italic text-info">
              {t.DC[lan]}
            </p>
          </label>
        </div>
      </form>
    </div>
  );
};

export default DatosCliente;
