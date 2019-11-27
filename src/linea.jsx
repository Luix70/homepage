import React from "react";

const Linea = ({ linea }) => {
  return (
    <React.Fragment>
      <tr>
        <td className="celdaCoart">{linea.coart}</td>
        <td className="celdaDesc">{linea.descripcion}</td>
        <td
          className={
            linea.cantidad === 1 || linea.cantidad === 0
              ? "celdaPrecio"
              : "celdaPrecio multiple"
          }
        >
          {linea.cantidad === 1 ? "" : linea.cantidad + " x "}
          {linea.precio !== 0
            ? Number.parseFloat(linea.precio).toFixed(2) + " €"
            : ""}
        </td>
      </tr>
      <tr>
        <td className="celdaCoart">&nbsp;</td>
        <td className="celdaRef_linea">{linea.ref_linea}</td>
        <td className="celdaPrecio">&nbsp;</td>
      </tr>
    </React.Fragment>
  );
};

export default Linea;
