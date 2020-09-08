import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody.jsx";
const Table = ({
  listaOrdenada,
  listaCampos,
  campoClave,
  sortColumn,
  onSort,
  lan
}) => {
  return (
    <React.Fragment>
      <table className="table ">
        <TableHeader
          sortColumn={sortColumn}
          onSort={onSort}
          listaCampos={listaCampos}
          lan={lan}
        />

        <TableBody
          listaElementos={listaOrdenada}
          listaCampos={listaCampos}
          campoClave={campoClave}
          lan={lan}
        />
      </table>
    </React.Fragment>
  );
};

export default Table;
