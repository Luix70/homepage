import React from "react";
import t from "./estadoOperacion.lit.json";
import MaterialIcon from "react-google-material-icons";
import moment from "moment";
import config from "../config.json";
import { toast } from "react-toastify";
import DocView from "./common/docView";

function formatFecha(fecha, formatoIngles) {
  var fecha2 = fecha.split(" ")[0];
  if (formatoIngles) {
    var dat = moment(fecha2, "DD/MM/YYYY");
    if (dat.month() < 12 && dat.date() < 12) {
      fecha2 = dat.month() + "/" + dat.date() + "/" + dat.year();
    }
  }
  return fecha2;
}

function handleClick(ruta, tipo, td, cd) {
  window.location.href =
    config.DataEndPoint +
    "JTransferScan?ruta=" +
    ruta +
    "&cd=" +
    cd +
    "&td=" +
    td +
    "&tipoArchivo=" +
    tipo;

  toast.success("Archivo descargado. Revisa las descargas de tu navegador");
}

function actualizarEstados(estados, doc, scans, lan) {
  //console.log(doc);

  for (var i = 0; i < estados.length; i++) {
    if (scans) {
      for (var k = 0; k < scans.length; k++) {
        for (var j = 0; j < estados[i].tiposScan.length; j++) {
          if (scans[k].codTipo === estados[i].tiposScan[j]) {
            estados[i].docs.push(scans[k]);
          }
        }
      }
    }
    switch (estados[i].estado) {
      case "RE":
        estados[i].fecha = doc.fechapedido;
        break;
      case "CO":
        if (doc.fechaConfirmacion) {
          estados[i].cumplido = true;
          estados[i].fecha =
            formatFecha(doc.fechaConfirmacion, false) +
            " -> (" +
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
            estados[i].fecha = formatFecha(doc.fecha2, false);
          } else {
            estados[i].fecha = formatFecha(doc.fecha2, false) + t.PV[lan];
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
  const { doc, lan, scans } = props;
  var estados = [
    {
      estado: "RE",
      cumplido: true,
      text: t.RE[lan],
      fecha: "",
      icono: "save",
      tiposScan: [1, 11, 29],
      docs: []
    },
    {
      estado: "CO",
      cumplido: false,
      text: t.CO[lan],
      fecha: "",
      icono: "mail_outline",
      tiposScan: [8, 28, 40],
      docs: []
    },
    {
      estado: "PR",
      cumplido: false,
      text: t.PR[lan],
      fecha: "",
      icono: "build",
      tiposScan: [],
      docs: []
    },
    {
      estado: "TE",
      cumplido: false,
      text: t.TE[lan],
      fecha: "",
      icono: "done",
      tiposScan: [],
      docs: []
    },
    {
      estado: "EN",
      cumplido: false,
      text: t.EN[lan],
      fecha: "",
      icono: "local_shipping",
      tiposScan: [2, 21, 25],
      docs: []
    },
    {
      estado: "FA",
      cumplido: false,
      text: t.FA[lan],
      fecha: "",
      icono: "receipt",
      tiposScan: [3, 34],
      docs: []
    }
  ];

  actualizarEstados(estados, doc, scans, lan);
  //console.log(estados);
  return (
    <ul className="list-group border-0">
      {estados.map(estado => {
        return (
          <li
            key={estado.estado}
            className={
              "list-group-item border-0  m-0 p-0 border-bottom" +
              (estado.cumplido ? " " : " bg-lighter-gray text-muted")
            }
          >
            <div className="row m-0 ">
              <div className="col-12 col-md-6 m-0 p-2 px-0 border-bottom d-flex align-items-center">
                <div
                  className={
                    " custom-btn-circle m-0 mr-2 d-inline border border-dark p-1 " +
                    (estado.cumplido ? " " : " icon-muted border-0")
                  }
                >
                  <MaterialIcon icon={estado.icono} size={16}></MaterialIcon>
                </div>
                <div>
                  <span className="mr-1">{t[estado.estado][lan]} </span>{" "}
                  <span>
                    <strong>{estado.fecha}</strong>
                  </span>
                </div>
              </div>
              <div className="col-12 col-md-6 bg-lighter-gray p-2 pl-5 border-bottom">
                {estado.docs.length > 0 ? (
                  <span>{t[estado.docs[0].codTipo][lan]}</span>
                ) : null}
                {estado.docs.map(scan => {
                  return (
                    <DocView
                      key={scan.numerador}
                      tipo={scan.TipoImagen}
                      ruta={scan.ruta + "\\" + scan.documento}
                      onClick={handleClick}
                      td={scan.tipodoc}
                      cd={scan.codigodoc}
                    ></DocView>
                  );
                })}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default EstadoOperacion;
