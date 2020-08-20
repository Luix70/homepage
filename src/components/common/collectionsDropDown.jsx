import React from "react";

const CollectionsDropDown = props => {
  const { label, cols } = props;
  const ncols = cols.map(col => col.mod).sort();

  return (
    <div className="dropdown ">
      <button
        className="btn btn-link text-decoration-none text-light dropdown-toggle pl-0 "
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {label}
      </button>
      <div
        className="dropdown-menu listaColecciones "
        aria-labelledby="dropdownMenuButton"
      >
        <form className="px-1 py-1 ">
          {ncols.map(col => (
            <a
              key={col}
              className="btn btn-secondary m-2 text-capitalize"
              href={"/coleccion/" + col}
            >
              {col}
            </a>
          ))}
        </form>
      </div>
    </div>
  );
};

export default CollectionsDropDown;
