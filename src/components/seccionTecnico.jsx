import React from "react";

const SeccionTecnico = props => {
  const { seccion, lan } = props;

  return (
    <div className="col-12">
      <h3 className="w-100 text-center">{seccion.titulo[lan].toUpperCase()}</h3>
      <ul>
        {seccion.items.map(item => (
          <li key={seccion.items.indexOf(item)}>{item[lan]}</li>
        ))}
      </ul>
    </div>
  );
};

export default SeccionTecnico;
