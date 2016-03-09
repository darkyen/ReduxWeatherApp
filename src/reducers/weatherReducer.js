import WeatherActions from 'constants/WeatherConstants';
import {resolve, reject, request} from 'redux-promised';

const r = {};

r[resolve(WeatherActions.GET_WEATHER_BY_NAME)] =
r[resolve(WeatherActions.GET_WEATHER_BY_LOCA)] = (state, action) => {
  const {payload} = action;
  const {weather} = state;
  const updates = {};
  try{
    updates.data = payload.json();
    updates.error = null;
  }catch(e){
    updates.error = {
      message: 'Error while loading data'
    };
  }
  updates.isLoading = false;

  const updatedWeather = Object.assign({}, weather, updates);

  return Object.assign({}, state, {
    weather: updatedWeather
  });
}

r[request(WeatherActions.GET_WEATHER_BY_NAME)] =
r[request(WeatherActions.GET_WEATHER_BY_LOCA)] = (state, action) => {
  const {query, source}  = action.meta;
  const {weather} = state;

  const updatedWeather = Object.assign({}, weather, {
    isLoading: true,
    source: source,
    query: query,
    data: null
  });

  return Object.assign({}, state, {
    weather: updatedWeather
  });
}

r[reject(WeatherActions.GET_WEATHER_BY_NAME)] =
r[reject(WeatherActions.GET_WEATHER_BY_LOCA)] = (state, action) => {
  const {error}   = action;
  const {weather} = state;
  const {message} = error;

  const updatedWeather = Object.assign({}, weather, {
    isLoading: false,
    error: {message}
  });


  return Object.assign({}, state, {
    weather: updatedWeather
  });
}

export default r;
