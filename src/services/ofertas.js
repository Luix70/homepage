import httpService from "./httpService";
import config from "../config.json";

export async function getCustomer() {
  const nEndPoint = config.apiDataEndPoint + "ofertas/custData";
  const token = sessionStorage.getItem("apiToken");

  const { data: liveData } = await httpService.get(nEndPoint, {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 30000,
  });

  return JSON.parse(liveData);
}

export default async function getData() {
  const nEndPoint = config.apiDataEndPoint + "ofertas/GetAll";

  // If cache is older than 25 min we retrieve another batch

  try {
    const token = sessionStorage.getItem("apiToken");
    // console.log("retrieved " + new Date(cachedData.FechaCache));
    const { data: liveData } = await httpService.get(nEndPoint, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 30000,
    });

    //console.log(liveData);
    const nData = JSON.parse(liveData);

    return nData;
  } catch (error) {
    console.log("error getData", error);
    return {};
  }
}
