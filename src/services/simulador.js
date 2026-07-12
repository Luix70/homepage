import demo from "../Data/simulador_demo.json";
// import httpService from "./httpService";
// import config from "../config.json";

/**
 * Devuelve la configuración del simulador (partes, acabados, suplementos)
 * para una colección/artículo.
 *
 * HOY: datos locales de demostración (src/Data/simulador_demo.json).
 *
 * MAÑANA: cuando el hub de publicación exponga el endpoint, sustituir por:
 *
 *   const { data } = await httpService.get(
 *     config.apiDataEndPoint + "simulador/" + col
 *   );
 *   return data;
 *
 * La estructura JSON es la misma que la tabla pim.ArticuloAcabado:
 * partes -> acabados -> suplemento (pct sobre base, o importe fijo).
 */
export async function getSimulador(col) {
  return demo;
}
