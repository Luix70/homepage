import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status === 404 &&
    error.response.status <= 500;
  //   … rutina global para tratar errores
  if (!expectedError) {
    console.log("Logging the error");
    toast.error("Ha ocurrido un error inesperado");
  }

  return Promise.reject(error); // devuelve el control al bloque catch
});

export default {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  update: axios.update,
  delete: axios.delete
};
