import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody.jsx";
const Table = ({
  listaOrdenada,
  listaCampos,
  campoClave,
  sortColumn,
  onSort
}) => {
  return (
    <React.Fragment>
      <table className="table table-dark ">
        <TableHeader
          sortColumn={sortColumn}
          onSort={onSort}
          listaCampos={listaCampos}
        />

        <TableBody
          listaElementos={listaOrdenada}
          listaCampos={listaCampos}
          campoClave={campoClave}
        />
      </table>
    </React.Fragment>
  );
};

export default Table;
