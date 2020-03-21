import _ from "lodash";
import httpService from "./httpService";

import config from "../config.json";

export default async function getClientes(repre) {
  var result = await getData();

  //console.log(lan, JSON.stringify(result) === "{}");
  if (JSON.stringify(result) === "{}") {
    //window.location = "/login";
    //console.log("pasa por aqui");

    sessionStorage.removeItem("cachedData");
    sessionStorage.removeItem("apiToken");
    sessionStorage.removeItem("nombreUsuario");

    return result;
  }
  if (repre.codrep === 0) return result;
  var reps = [...result.representantes];

  result.representantes = reps.filter(rep => rep.codrep === repre.codrep);
  result.totalRepresentantes = result.representantes.length;

  return result;
}

export async function getRepres() {
  // TODO :  invocar a un metodo que devuelva solamente los representantes
  var result = await getData();

  //console.log(lan, JSON.stringify(result) === "{}");
  if (JSON.stringify(result) === "{}") {
    //window.location = "/login";
    sessionStorage.removeItem("cachedData");
    sessionStorage.removeItem("apiToken");
    sessionStorage.removeItem("nombreUsuario");

    return result;
  }
  try {
    return result.representantes.map(repre => {
      return _.pick(repre, ["codrep", "nombre", "totalClientes"]);
    });
  } catch (error) {
    console.log("error getrepres", error);
    return {};
  }
}

export async function getDatosCliente(codCli) {
  const nEndPoint = config.apiDataEndPoint + "customers/GetId/" + codCli;
  console.log(nEndPoint);
  try {
    const token = sessionStorage.getItem("apiToken");
    // console.log("retrieved " + new Date(cachedData.FechaCache));
    const { data: liveData } = await httpService.get(nEndPoint, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 30000
    });
    //console.log(liveData);
    const nData = JSON.parse(liveData);
    //console.log(nData);
    return nData;
  } catch (error) {
    console.log("error getData", error);
    return {};
  }
}

async function getData() {
  const nEndPoint = config.apiDataEndPoint + "customers/GetAll";

  const cachedData = JSON.parse(sessionStorage.getItem("cachedData"));

  // If cache is older than 25 min we retrieve another batch
  if (
    cachedData !== null &&
    Math.abs(new Date(cachedData.FechaCache) - Date.now()) / (1000 * 60) < 10 //antiguedad menor de 10 minutos
  ) {
    //console.log("cached " + new Date(cachedData.FechaCache));
    return cachedData;
  } else {
    try {
      const token = sessionStorage.getItem("apiToken");
      // console.log("retrieved " + new Date(cachedData.FechaCache));
      const { data: liveData } = await httpService.get(nEndPoint, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 30000
      });

      const nData = JSON.parse(liveData);
      nData.FechaCache = Date.now();
      sessionStorage.setItem("cachedData", JSON.stringify(nData));

      return nData;
    } catch (error) {
      console.log("error getData", error);
      return {};
    }
  }
}
