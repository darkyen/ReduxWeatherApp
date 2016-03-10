import {resolve, reject, request} from 'redux-promised';
import WeatherActions from 'constants/WeatherConstants';
import AppConstants from 'constants/AppConstants';
import deepAssign from 'assign-deep';

const r = {};

r[request(WeatherActions.GET_WEATHER_BY_ZIP)] =
r[request(WeatherActions.GET_WEATHER_BY_LOCA)] = (weather) => {
  return deepAssign({}, weather, {
    isRequesting: true,
    hasLoaded: false
  });
}

r[AppConstants.CLEAR_WEATHER] = (weather) => {
  return deepAssign({}, weather, {
    isRequesting: false,
    hasLoaded: false,
    forecast: {},
    current: {}
  });
}


r[resolve(WeatherActions.GET_WEATHER_BY_ZIP)] =
r[resolve(WeatherActions.GET_WEATHER_BY_LOCA)] = (weather, action) => {
  const {payload} = action;

  return deepAssign({}, weather,{
    current: payload,
    error: null,
    hasLoaded: true,
    isRequesting: false,
  });
}


r[reject(WeatherActions.GET_WEATHER_BY_ZIP)] =
r[reject(WeatherActions.GET_WEATHER_BY_LOCA)] = (weather, action) => {
  const {error}   = action;
  const {message} = error;
  // Deepmerge
  return deepAssign({}, weather, {
    isRequesting: false,
    hasLoaded: false,
    error: {message}
  });
}

export default r;
