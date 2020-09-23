import httpService from "./httpService";
import config from "../config.json";

export async function getColeccion(col) {
  const colecciones = await getColecciones();
  // console.log(colecciones);

  return colecciones.filter((coleccion) => coleccion.mod === col)[0];
}

export async function getColecciones() {
  const scolecciones = JSON.parse(
    sessionStorage.getItem("colecciones_indesan")
  );
  if (!scolecciones) {
    const apiEndpoint = config.apiEndPoint;
    const { data: colecciones } = await httpService.get(
      apiEndpoint + "/Colecciones/web"
    );
    sessionStorage.setItem("colecciones_indesan", JSON.stringify(colecciones));
    return colecciones;
  } else {
    return scolecciones;
  }
}

export async function getImages(col) {
  const apiEndpoint = config.apiEndPoint;
  const { data: listaImagenes } = await httpService.get(
    apiEndpoint + "/imagenes/" + col
  );
  return listaImagenes;
}

export function getLan() {
  // console.log( sessionStorage.getItem("lan"),  sessionStorage.getItem("lan") || "es"  );
  const lan =
    sessionStorage.getItem("lan") ||
    navigator.language.substring(0, 2).toLowerCase() ||
    navigator.userLanguage.substring(0, 2).toLowerCase() ||
    "es";
  //console.log(lan);
  return lan;
}
