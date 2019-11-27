import React from "react";
// al ser una SFC no se requiere importar Component
import Operacion from "./operacion";
const Cliente = ({ cliente: cli }) => {
  return (
    <table>
      <tbody>
        <tr className="bg-primary" key={cli.codigo}>
          <td className="codCliente">
            <strong>{cli.codigo}</strong>
          </td>
          <td>
            <em>
              {cli.rzs} ( {cli.poblacion})
            </em>
          </td>
          <td className="numped">Docs: {cli.totalDocumentos}</td>
          <td className="numped">&nbsp;</td>
        </tr>
        <tr key={cli.codigo + "-ops"}>
          <td colSpan="4" style={{ width: "100%" }}>
            <table className="table table-dark table-sm table-borderless">
              <tbody>
                {cli.documentos.map(doc => (
                  <Operacion
                    key={doc.tipodoc + doc.codigodoc}
                    documento={doc}
                  />
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Cliente;
