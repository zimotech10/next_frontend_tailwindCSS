import { CookieRepository } from "@/storages/cookie/cookie-repository";
import axios from "axios";

let accessToken = CookieRepository.getAccessToken();

const axiosClient = axios.create({
  baseURL: "http://95.164.7.220:8000/api",
  headers: {
    "Content-Type": "application/json",
    ...(accessToken ? { authorization : `Bearer ${accessToken}`} : {})
  },
});

export default axiosClient;
