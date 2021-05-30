import axiosInstance from "../../config/axios-instance";

function registerRequest(body) {
    return axiosInstance({
        method: "post",
        url: "api/register",
        data: body,
    });
}

function loginRequest(body) {
    return axiosInstance({
        method: "post",
        url: "api/login",
        data: body,
    });
}

function getInfosRequest(body) {
    return axiosInstance({
        method: "get",
        url: "api/user",
        data: body,
    });
}

function logoutRequest(body) {
    return axiosInstance({
        method: "post",
        url: "api/logout",
        data: null,
    });
}

const AuthServices = {
    registerRequest,
    loginRequest,
    getInfosRequest,
    logoutRequest
};

export default AuthServices;