import axios from "axios";
import { toast } from "react-toastify";
import Logger from "./logService";

axios.interceptors.response.use(null, error => {
  if (error.response.status < 400 && error.response.status > 500) {
    toast.error("unexpcted Error!!!");
    Logger.log(error);
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
