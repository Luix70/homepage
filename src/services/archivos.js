import httpService from "./httpService";
import config from "../config.json";

export default async function getScans(tipodoc, codigodoc) {
  var result = await getData(tipodoc, codigodoc);

  var fclientes = { ...result };

  return fclientes.Scanners;
}

async function getData(tipodoc, codigodoc) {
  const nEndPoint = `${config.DataEndPoint}JScans?cd=${codigodoc}&td=${tipodoc}`;
  console.log(nEndPoint);
  try {
    const { data: liveData } = await httpService.get(nEndPoint);

    return liveData;
  } catch (error) {
    return {};
  }
}
