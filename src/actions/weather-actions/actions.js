import {
    GET_WEATHER_REQUEST,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_FAILURE,
    GET_WEATHER_ALL_REQUEST,
    GET_WEATHER_ALL_SUCCESS,
    GET_WEATHER_ALL_FAILURE,
    BOOKMARK_REQUEST,
    BOOKMARK_SUCCESS,
    BOOKMARK_FAILURE,
    SHARE_WEATHER_REQUEST,
    SHARE_WEATHER_SUCCESS,
    SHARE_WEATHER_FAILURE
} from './types';

import WeatherServices from './services';

export function getWeather() {
    return async (dispatch) => {
      await dispatch({
        type: GET_WEATHER_REQUEST
      });
      try {
        const response = await WeatherServices.getWeatherRequest();
        await dispatch({
          type: GET_WEATHER_SUCCESS,
          payload: {
            weather: response.data
          },
        });
      } catch (e) {
        dispatch({
          type: GET_WEATHER_FAILURE,
        });
      }
    };
  }

  export function getWeatherAll() {
    return async (dispatch) => {
      await dispatch({
        type: GET_WEATHER_ALL_REQUEST
      });
      try {
        const response = await WeatherServices.getWeatherAllRequest();
        await dispatch({
          type: GET_WEATHER_ALL_SUCCESS,
          payload: {
            weather: response.data
          },
        });
      } catch (e) {
        dispatch({
          type: GET_WEATHER_ALL_FAILURE,
        });
      }
    };
  }

  export function createBookmark(body) {
    return async (dispatch) => {
      await dispatch({
        type: BOOKMARK_REQUEST
      });
      try {
        const response = await WeatherServices.createBookmarkRequest(body);
        await dispatch({
          type: BOOKMARK_SUCCESS,
          payload: {
            payload: response.data
          },
        });
      } catch (e) {
        dispatch({
          type: BOOKMARK_FAILURE,
        });
      }
    };
  }

  export function deleteBookmark(body) {
    return async (dispatch) => {
      await dispatch({
        type: BOOKMARK_REQUEST
      });
      try {
        const response = await WeatherServices.deleteBookmarkRequest(body);
        await dispatch({
          type: BOOKMARK_SUCCESS,
          payload: {
            payload: response.data
          },
        });
      } catch (e) {
        dispatch({
          type: BOOKMARK_FAILURE,
        });
      }
    };
  }

  export function shareWeather(body) {
    return async (dispatch) => {
      await dispatch({
        type: SHARE_WEATHER_REQUEST
      });
      try {
        const response = await WeatherServices.shareWeatherRequest(body);
        await dispatch({
          type: SHARE_WEATHER_SUCCESS,
          payload: {
            payload: response.data
          },
        });
      } catch (e) {
        dispatch({
          type: SHARE_WEATHER_FAILURE,
        });
      }
    };
  }