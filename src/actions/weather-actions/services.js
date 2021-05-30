import axiosInstance from "../../config/axios-instance";

function getWeatherRequest() {
  return axiosInstance({
    method: "get",
    url: "api/weather/",
    data: null,
  });
}

function getWeatherAllRequest() {
  return axiosInstance({
    method: "get",
    url: "api/weather/all/",
    data: null,
  });
}

function createBookmarkRequest(body) {
  return axiosInstance({
    method: "post",
    url: "api/bookmark/",
    data: body,
  });
}

function deleteBookmarkRequest(body) {
  return axiosInstance({
    method: "delete",
    url: "api/bookmark/",
    data: body,
  });
}

function shareWeatherRequest(body) {
  return axiosInstance({
    method: "post",
    url: "api/share/",
    data: body,
  });
}


const WeatherServices = {
    getWeatherRequest,
    getWeatherAllRequest,
    createBookmarkRequest,
    deleteBookmarkRequest,
    shareWeatherRequest
  };
  
  export default WeatherServices;