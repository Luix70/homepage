import React from "react";
const TableHeader = ({ sortColumn, onSort, listaCampos }) => {
  const ordenIcon = "fa fa-sort-" + sortColumn.order;
  return (
    <thead className="encab-representante">
      <tr className="bg-info">
        {listaCampos.map(campo => {
          return (
            <th
              key={campo.path}
              onClick={() => onSort(campo.path)}
              style={{ width: campo.width }}
            >
              <div className="row">
                <div className="col-12"></div>
                <div className="col-12">
                  {sortColumn.path === campo.path ? (
                    <i className={ordenIcon}></i>
                  ) : null}{" "}
                  <span className="sortable">{campo.label}</span>
                </div>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
