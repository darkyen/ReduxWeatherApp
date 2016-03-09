import {createAction} from 'redux-actions';
import {WeatherAPI} from 'lib/api';
import WeatherConstants from 'constants/WeatherConstants';

const getWeatherByLocation = createAction(
  WeatherConstants.GET_WEATHER_BY_LOCA,
  WeatherAPI.getWeatherByLocation
);

const getWeatherByZIP = createAction(
  WeatherConstants.GET_WEATHER_BY_ZIP,
  WeatherAPI.getWeatherByZIP
);

export {getWeatherByZIP, getWeatherByLocation};
