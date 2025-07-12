import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3850",
  withCredentials: true,
});

export default axiosInstance;
