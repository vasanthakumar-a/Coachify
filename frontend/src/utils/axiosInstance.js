import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://coachify-01m4.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
