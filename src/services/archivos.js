import httpService from "./httpService";
import config from "../config.json";

export default async function getScans(tipodoc, codigodoc, tipoScan) {
  var result = await getData(tipodoc, codigodoc, tipoScan);

  var fclientes = { ...result };

  return fclientes.Scanners;
}

async function getData(tipodoc, codigodoc, tipoScan) {
  const nEndPoint = `${config.apiEndPoint}/JScans?cd=${codigodoc}&td=${tipodoc}`;

  try {
    const { data: liveData } = await httpService.get(nEndPoint);

    return liveData;
  } catch (error) {
    return {};
  }
}
