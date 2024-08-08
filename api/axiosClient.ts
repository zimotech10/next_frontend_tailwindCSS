import { CookieRepository } from "@/storages/cookie/cookie-repository";
import axios from "axios";

let accessToken = CookieRepository.getAccessToken();

const axiosClient = axios.create({
  baseURL: "https://bictory-marketplace-backend.onrender.com/api/user",
  headers: {
    "Content-Type": "application/json",
    ...(accessToken ? { authorization : `Bearer ${accessToken}`} : {})
  },
});

export default axiosClient;
