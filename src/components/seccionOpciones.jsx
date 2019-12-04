import React from "react";
const SeccionOpciones = props => {
  const { seccion, lan } = props;
  console.log(seccion, lan);
  return (
    <div className="col-12">
      <h3 className="w-100 text-center">{seccion.titulo[lan].toUpperCase()}</h3>
      <div className="row">
        {seccion.subopciones.map(so => (
          <div
            key={seccion.subopciones.indexOf(so)}
            className="col-12 col-md-6 col-lg-4  px-4 align-content-start"
          >
            <h4>{so.titulo[lan]}</h4>
            <h5>{so.subtitulo[lan]}</h5>
            <ul>
              {so.opciones.map(op => (
                <li key={so.opciones.indexOf(op)}>{op[lan]}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeccionOpciones;
