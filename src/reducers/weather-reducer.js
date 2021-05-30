import {
    GET_WEATHER_REQUEST,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_FAILURE,
    GET_WEATHER_ALL_REQUEST,
    GET_WEATHER_ALL_SUCCESS,
    GET_WEATHER_ALL_FAILURE
} from '../actions/weather-actions/types';

const INITIAL_STATE = {
    weather: null,
    weather_all: []
};

export const weatherReducer = (
    state = INITIAL_STATE,
    action
  ) => {
    switch (action.type) {
      // MY LOCATION WEATHER
      case GET_WEATHER_REQUEST:
        return {
          ...state,
        };
      case GET_WEATHER_SUCCESS:
        return {
          ...state,
          weather: action.payload.weather,
        };
      case GET_WEATHER_FAILURE:
        return {
          ...state,
        };
      // ALL WEATHER
      case GET_WEATHER_ALL_REQUEST:
        return {
          ...state,
        };
      case GET_WEATHER_ALL_SUCCESS:
        return {
          ...state,
          weather_all: action.payload.weather,
        };
      case GET_WEATHER_ALL_FAILURE:
        return {
          ...state,
        };
      
      default:
        return state;
    }
  };
  