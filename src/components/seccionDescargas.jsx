import React from "react";
import MaterialIcon from "react-google-material-icons";
const SeccionDescargas = props => {
  const { seccion, lan, folder } = props;
  console.log(seccion, lan);
  return (
    <div className="col-12">
      <h3 className="w-100 text-center">{seccion.titulo[lan].toUpperCase()}</h3>
      <div className="row">
        <div className="col-12">
          <ul className="list-group ">
            {seccion.documentos.map(doc => {
              const ruta = doc.comun ? `/resources/img/comun/` : folder;
              return (
                <li
                  key={seccion.documentos.indexOf(doc)}
                  className="list-group-item "
                >
                  <a
                    href={`${ruta}${doc.archivo[lan]}`}
                    alt={doc.nombreDocumento[lan]}
                    className="btn btn-link"
                    style={{ textDecoration: "none" }}
                    download
                  >
                    <div className="d-flex align-items-center">
                      <MaterialIcon icon="cloud_download" size={24} />
                      <span className="ml-4">{doc.nombreDocumento[lan]}</span>
                    </div>
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
