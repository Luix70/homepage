import React from "react";
const SeccionOpciones = (props) => {
  const { seccion, lan } = props;

  //console.log(seccion, lan);
  return (
    <div className="col-12">
      <h3 className="text-center mb-4">{seccion.titulo[lan].toUpperCase()}</h3>
      <div className="row d-flex justify-content-center align-items-start">
        {seccion.subopciones.map((so) => (
          <div
            key={seccion.subopciones.indexOf(so)}
            className="col-12 col-sm-6 col-lg-4   align-content-start"
          >
            <h4>{so.titulo[lan]}</h4>

            <ul className="list-group">
              {so.subtitulo[lan] ? (
                <li
                  className="list-group-item p-2 m-0 border-0 border-right-0 border-left-0"
                  key="-1"
                >
                  <h6 className="text-small text-small bg-light m-0 p-0">
                    {so.subtitulo[lan].split("#").map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </h6>
                </li>
              ) : null}
              {so.opciones.map((op) => (
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
