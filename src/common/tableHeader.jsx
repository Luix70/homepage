import React from "react";
const TableHeader = ({ sortColumn, onSort, listaCampos }) => {
  const ordenIcon = "fa fa-sort-" + sortColumn.order;
  return (
    <thead className="encab-representante">
      <tr>
        {listaCampos.map(campo => {
          return (
            <th
              key={campo.path}
              onClick={() => onSort(campo.path)}
              style={{ width: campo.width }}
            >
              {sortColumn.path === campo.path ? (
                <i className={ordenIcon}></i>
              ) : null}{" "}
              <span className="sortable">{campo.label}</span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
