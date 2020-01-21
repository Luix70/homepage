import React from "react";
import t from "./estadoOperacion.lit.json";
import MaterialIcon from "react-google-material-icons";

function actualizarEstados(estados, doc) {
  for (var i = 0; i < estados.length; i++) {
    console.log(doc);
  }
}

const EstadoOperacion = props => {
  const { doc, lan } = props;
  var estados = [
    {
      estado: "RE",
      cumplido: true,
      text: t.RE[lan],
      fecha: "",
      icono: "save",
      docs: []
    },
    {
      estado: "CO",
      cumplido: false,
      text: t.CO[lan],
      fecha: "",
      icono: "mail_outline",
      docs: []
    },
    {
      estado: "PR",
      cumplido: false,
      text: t.PR[lan],
      fecha: "",
      icono: "build",
      docs: []
    },
    {
      estado: "TE",
      cumplido: false,
      text: t.TE[lan],
      fecha: "",
      icono: "done",
      docs: []
    },
    {
      estado: "EN",
      cumplido: false,
      text: t.EN[lan],
      fecha: "",
      icono: "local_shipping",
      docs: []
    },
    {
      estado: "FA",
      cumplido: false,
      text: t.FA[lan],
      fecha: "",
      icono: "receipt",
      docs: []
    }
  ];

  actualizarEstados(estados, doc);

  return (
    <ul className="list-group border-0">
      {estados.map(estado => {
        return (
          <li
            key={estado.estado}
            className={
              "list-group-item border-0" +
              (estado.cumplido ? " " : " bg-lighter-gray text-muted")
            }
          >
            <div className="row ">
              <div className="col-8">
                <button className="btn btn-outline-dark custom-btn-circle m-0 mr-2">
                  <MaterialIcon icon={estado.icono} size={20}></MaterialIcon>
                </button>
                {t[estado.estado][lan]} {estado.fecha}
              </div>
              <div className="col-4 ">{t.DO[lan]}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default EstadoOperacion;
