import _ from "lodash";
import httpService from "./httpService";
import config from "../config.json";

export default async function getClientes(repre) {
  var result = await getData();
  if (repre.codrep === 0) return result;
  var reps = [...result.representantes];

  result.representantes = reps.filter(rep => rep.codrep === repre.codrep);
  result.totalRepresentantes = result.representantes.length;

  return result;
}

export async function getRepres() {
  // TODO :  invocar a un metodo que devuelva solamente los representantes
  var result = await getData();

  try {
    return result.representantes.map(repre => {
      return _.pick(repre, ["codrep", "nombre", "totalClientes"]);
    });
  } catch (error) {
    console.log("error getrepres", error);
    return {};
  }
}

async function getData() {
  const nEndPoint = config.apiEndPoint3 + "customers/GetAll";

  const cachedData = JSON.parse(sessionStorage.getItem("cachedData"));

  // If cache is older than 25 min we retrieve another batch
  if (
    cachedData !== null &&
    Math.abs(new Date(cachedData.FechaCache) - Date.now()) / (1000 * 60) < 25
  ) {
    //console.log("cached " + new Date(cachedData.FechaCache));
    return cachedData;
  } else {
    try {
      const token = sessionStorage.getItem("apiToken");

      const { data: liveData } = await httpService.get(nEndPoint, {
        headers: { Authorization: `Bearer ${token}` }
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
