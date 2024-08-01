import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://74.119.194.123:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
