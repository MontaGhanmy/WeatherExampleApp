import {
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
} from "./types";
import { message } from 'antd';
import AuthServices from "./services";

export function registerUser(values) {
  return async (dispatch) => {
      dispatch({type: REGISTER_REQUEST});
      try {
      const response = await AuthServices.registerRequest(values);
      dispatch({type: REGISTER_SUCCESS, payload: response.data});
      localStorage.setItem("weather_token", response.data.token);

      } catch (e) {
        dispatch({type: REGISTER_FAILURE});
        message.error('Verify your credentials please!');
      }
  };
}

export function loginUser(values) {
  return async (dispatch) => {
      dispatch({type: LOGIN_REQUEST});
      try {
      const response = await AuthServices.loginRequest(values);
      dispatch({type: LOGIN_SUCCESS, payload: response.data});
      localStorage.setItem("weather_token", response.data.token);

      } catch (e) {
        dispatch({type: LOGIN_FAILURE});
        message.error('Verify your credentials please!');
      }
  };
}

export function getInfos() {
  return async (dispatch) => {
      dispatch({type: GET_USER_REQUEST});
      try {
      const response = await AuthServices.getInfosRequest();
      dispatch({type: GET_USER_SUCCESS, payload: response.data});

      } catch (e) {
      dispatch({type: GET_USER_FAILURE});
      }
  };
}


export function logoutUser() {
  return async (dispatch) => {
    dispatch({type: LOGOUT_REQUEST});
    try {
      await AuthServices.logoutRequest();
      localStorage.removeItem("weather_token");
      dispatch({type: LOGOUT_SUCCESS});
    } catch (e) {
      dispatch({type: LOGOUT_FAILURE});
    }
  };
}