import React from "react";
import t from "./datosRepresentante.lit.json";

const DatosRepresentante = (props) => {
  const { lan, datosCliente } = props;
  return (
    <div className="col-12">
      <form>
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
            <label htmlFor="emailRep">{t.EM[lan]}</label>
            <input
              type="text"
              className="form-control"
              id="emailRep"
              placeholder={datosCliente.EmailRepresentante}
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default DatosRepresentante;
