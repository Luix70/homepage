import React from "react";
import MaterialIcon from "react-google-material-icons";
const SeccionDescargas = props => {
  const { seccion, lan, col } = props;
  console.log(seccion, lan);
  return (
    <div className="col-12">
      <h3 className="w-100 text-center">{seccion.titulo[lan].toUpperCase()}</h3>
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {seccion.documentos.map(doc => {
              const ruta = doc.comun
                ? `/resources/images/Colecciones/${col}`
                : "/resources/images/Colecciones/comun";
              return (
                <li
                  key={seccion.documentos.indexOf(doc)}
                  className="list-group-item"
                >
                  <a
                    href={`${ruta}/${doc.archivo[lan]}`}
                    alt={doc.nombreDocumento[lan]}
                    download
                  >
                    <MaterialIcon icon="cloud_download" size={24} />
                    <span className="ml-2">{doc.nombreDocumento[lan]}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SeccionDescargas;
