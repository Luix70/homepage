import demo from "../Data/simulador_demo.json";
import m3041 from "../Data/simulador_3041.json";
import m870 from "../Data/simulador_870.json";
// import httpService from "./httpService";
// import config from "../config.json";

/* Registro local de modelos publicados en el simulador.
 * HOY: ficheros de demostracion en src/Data.
 * MAÑANA: sustituir por la API (un fetch por sku y otro para el listado):
 *
 *   const { data } = await httpService.get(
 *     config.apiEndPoint + "/simulador/" + lan + "/" + sku
 *   );
 *   return data;
 */
const registro = {
  demo: demo,
  "3041": m3041,
  "870": m870,
};

export async function getSimulador(sku) {
  return registro[sku] || demo;
}

/* Listado para el desplegable de modelos */
export function getModelosSimulador() {
  return Object.keys(registro).map((ruta) => ({
    ruta: ruta,
    nombre: registro[ruta].nombre,
  }));
}
