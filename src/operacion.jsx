import React from "react";
import Linea from "./linea";
import { Link } from "react-router-dom";
// al ser una SFC no se requiere importar Component
const Operacion = ({ documento: doc }) => {
  return (
    <React.Fragment>
      <tr>
        <td className="celdaDocumento">
          <span className={"tipodoc tipodoc-" + doc.tipodoc}>
            {doc.tipodoc}
          </span>{" "}
          <Link to={`/scans/${doc.tipodoc}/${doc.codigodoc}`}>
            {doc.codigodoc}
          </Link>
        </td>
        <td className="celdaFecha">
          Fecha:
          {doc.fechapedido.replace(" 0:00:00", "")}
        </td>
        <td className="celdaReferencia">Ref: {doc.referencia}</td>
        <td className="celdaEtiqImporte">Bruto: </td>
        <td className="celdaImporte">
          <b>{Number.parseFloat(doc.Importebruto).toFixed(2)} </b>€
        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td colSpan="4" className="lineas">
          <table className="table">
            <tbody>
              {doc.lineas.map(linea => (
                <Linea key={linea.codLinea} linea={linea} />
              ))}
            </tbody>
          </table>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Operacion;
