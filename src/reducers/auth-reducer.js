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
} from '../actions/auth/types';

const INITIAL_STATE = {
  user: null,
  token: localStorage.getItem("weather_token")
};

export const authReducer = (
    state = INITIAL_STATE,
    action
  ) => {
    switch (action.type) {
      // REGISTER
      case REGISTER_REQUEST:
        return {
          ...state,
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user
        };
      case REGISTER_FAILURE:
        return {
          ...state,
        };
      // LOG IN
      case LOGIN_REQUEST:
        return {
          ...state,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user
        };
      case LOGIN_FAILURE:
        return {
          ...state,
        };
      // GET USER INFOS
      case GET_USER_REQUEST:
        return {
          ...state,
        };
      case GET_USER_SUCCESS:
        return {
          ...state,
          user: action.payload.user
        };
      case GET_USER_FAILURE:
        return {
          ...state,
        };
      // LOG OUT
      case LOGOUT_REQUEST:
        return {
          ...state,
        };
      case LOGOUT_SUCCESS:
        localStorage.clear();
        return {
          ...state,
          token: null,
        };
      case LOGOUT_FAILURE:
        localStorage.clear();
        return {
          ...state,
          token: null,
        };
      default:
        return state;
    }
  };
  