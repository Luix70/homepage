import React from "react";

const SeccionTecnico = props => {
  const { seccion, lan } = props;

  return (
    <div className="col-12">
      <h3 className="text-center">{seccion.titulo[lan].toUpperCase()}</h3>
      <ul className="list-group">
        {seccion.items.map(item => (
          <li className="list-group-item" key={seccion.items.indexOf(item)}>
            {item[lan]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeccionTecnico;
