import axios from "axios";

const token = localStorage.getItem("weather_token");

const axiosInstance = axios.create({
  //baseURL: process.env.MIX_API_URL,
  baseURL: 'http://localhost:8000',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);


export default axiosInstance;
