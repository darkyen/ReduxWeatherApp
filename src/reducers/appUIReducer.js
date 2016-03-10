import AppConstants from 'constants/AppConstants';
import WeatherConstants from 'constants/WeatherConstants';
import {reject, request} from 'redux-promised';
import deepAssign from 'assign-deep';
const r = {};

// If there is no action then the user simply
// denied location on popup

r[AppConstants.APP_LOCATION_FAILED] = (app) => {
  return deepAssign({}, app, {
    source: WeatherConstants.SOURCE_ZIP
  });
}

r[AppConstants.CLEAR_WEATHER] = (app) => {
  return deepAssign({}, app, {
    source: WeatherConstants.SOURCE_LOCATION,
    hasPermission: false,
    query: ''
  });
}

r[request(WeatherConstants.GET_WEATHER_BY_LOCA)] = (app) => {
  console.log("Setting permission to true");
  return deepAssign({}, app, {
    hasPermission: true
  });
}

r[request(WeatherConstants.GET_WEATHER_BY_ZIP)] = (app, action) => {
  const {meta} = action;
  console.log("Setting permission to true");
  return deepAssign({}, app, {
    query: meta
  });
}

r[reject(WeatherConstants.GET_WEATHER_BY_LOCA)] = (app) => {
  return deepAssign({}, app, {
    source: WeatherConstants.SOURCE_ZIP,
    hasPermission: false
  });
}
export default r;
