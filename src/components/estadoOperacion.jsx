import React from "react";
import t from "./estadoOperacion.lit.json";
import MaterialIcon from "react-google-material-icons";
import moment from "moment";
function formatFecha(fecha, formatoIngles) {
  var fecha2 = fecha.split(" ")[0];
  if (formatoIngles) {
    var dat = moment(fecha2, "DD/MM/YYYY");
    if (dat.month() < 12 && dat.date() < 12) {
      fecha2 = dat.month() + "-" + dat.date() + "-" + dat.year() + "*";
    }
  }
  return fecha2;
}
function actualizarEstados(estados, doc) {
  //console.log(doc);
  for (var i = 0; i < estados.length; i++) {
    switch (estados[i].estado) {
      case "RE":
        estados[i].fecha = doc.fechapedido;
        break;
      case "CO":
        if (doc.fechaConfirmacion) {
          estados[i].cumplido = true;
          estados[i].fecha =
            formatFecha(doc.fechaConfirmacion, false) +
            " (" +
            (doc.confirmadoA || "Fax") +
            ")";
        }
        break;
      case "PR":
        if (doc.primeraPintura && doc.primeraPintura !== "0:00:00") {
          estados[i].cumplido = true;
          estados[i].fecha = formatFecha(doc.primeraPintura, false);
        } else {
          if (doc.tipodoc !== "P") {
            estados[i].cumplido = true;
            estados[i].fecha = formatFecha(doc.fechadoc, false);
          }
        }
        break;
      case "TE":
        if (doc.ultimoEmbalaje && doc.ultimoEmbalaje !== "31/12/2100") {
          estados[i].cumplido = true;
          estados[i].fecha = formatFecha(doc.ultimoEmbalaje, false);
        } else {
          if (doc.tipodoc !== "P") {
            estados[i].cumplido = true;
            estados[i].fecha = formatFecha(doc.fechadoc, false);
          }
        }
        if (
          moment(estados[i - 1].fecha, "DD/MM/YYYY") >
          moment(estados[i].fecha, "DD/MM/YYYY")
        ) {
          estados[i - 1].fecha = estados[i].fecha;
        }
        break;
      case "EN":
        if (doc.fechaEntrega && doc.fechaEntrega !== "0:00:00") {
          estados[i].cumplido = true;
          estados[i].fecha = formatFecha(doc.fechaEntrega, true);
        } else {
          if (doc.tipodoc !== "P") {
            estados[i].cumplido = true;
            estados[i].fecha = formatFecha(doc.fechadoc, false);
          }
        }
        break;
      case "FA":
        if (doc.tipodoc === "F") {
          estados[i].cumplido = true;
          estados[i].fecha = formatFecha(doc.fechadoc, false);
        }
        break;
      default:
    }
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
      docs: null
    },
    {
      estado: "CO",
      cumplido: false,
      text: t.CO[lan],
      fecha: "",
      icono: "mail_outline",
      docs: null
    },
    {
      estado: "PR",
      cumplido: false,
      text: t.PR[lan],
      fecha: "",
      icono: "build",
      docs: null
    },
    {
      estado: "TE",
      cumplido: false,
      text: t.TE[lan],
      fecha: "",
      icono: "done",
      docs: null
    },
    {
      estado: "EN",
      cumplido: false,
      text: t.EN[lan],
      fecha: "",
      icono: "local_shipping",
      docs: null
    },
    {
      estado: "FA",
      cumplido: false,
      text: t.FA[lan],
      fecha: "",
      icono: "receipt",
      docs: null
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
                <button
                  className={
                    "btn btn-outline-dark custom-btn-circle m-0 mr-2 " +
                    (estado.cumplido ? " " : " icon-muted border-0")
                  }
                >
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
