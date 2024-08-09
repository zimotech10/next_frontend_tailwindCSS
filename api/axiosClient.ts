import { CookieRepository } from "@/storages/cookie/cookie-repository";
import axios from "axios";

let accessToken = CookieRepository.getAccessToken();

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
  headers: {
    "Content-Type": "application/json",
    ...(accessToken ? { authorization : `${accessToken}`} : {})
  },
});

export default axiosClient;
