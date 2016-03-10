import {resolve, reject, request} from 'redux-promised';
import WeatherActions from 'constants/WeatherConstants';
import AppConstants from 'constants/AppConstants';
import deepAssign from 'assign-deep';

const r = {};

r[request(WeatherActions.GET_WEATHER_BY_ZIP)] =
r[request(WeatherActions.GET_WEATHER_BY_LOCA)] = (weather) => {
  return deepAssign({}, weather, {
    isRequesting: true
  });
}

r[AppConstants.CLEAR_WEATHER] = (weather) => {
  return deepAssign({}, weather, {
    isRequesting: false,
    forecast: null,
    current: null
  });
}


r[resolve(WeatherActions.GET_WEATHER_BY_ZIP)] =
r[resolve(WeatherActions.GET_WEATHER_BY_LOCA)] = (weather, action) => {
  const {payload} = action;

  return deepAssign({}, weather, {
    isRequesting: false,
    current: payload,
    error: null,
  });
}


r[reject(WeatherActions.GET_WEATHER_BY_ZIP)] =
r[reject(WeatherActions.GET_WEATHER_BY_LOCA)] = (weather, action) => {
  const {error}   = action;
  const {message} = error;
  // Deepmerge
  return deepAssign({}, weather, {
    isRequesting: false,
    error: {message}
  });
}

export default r;
