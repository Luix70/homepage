import React from "react";
const SeccionOpciones = props => {
  const { seccion, lan } = props;
  //console.log(seccion, lan);
  return (
    <div className="col-12">
      <h3 className="text-center mb-4">{seccion.titulo[lan].toUpperCase()}</h3>
      <div className="row d-flex justify-content-center align-items-center">
        {seccion.subopciones.map(so => (
          <div
            key={seccion.subopciones.indexOf(so)}
            className="col-12 col-sm-6 col-lg-4   align-content-start"
          >
            <h4>{so.titulo[lan]}</h4>

            <ul className="list-group">
              {so.subtitulo[lan] ? (
                <li className="list-group-item h-5">
                  <h6 className="test-small">{so.subtitulo[lan]}</h6>
                </li>
              ) : null}
              {so.opciones.map(op => (
                <li className="list-group-item" key={so.opciones.indexOf(op)}>
                  {op[lan]}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeccionOpciones;