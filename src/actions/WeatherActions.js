import {createAction} from 'redux-actions';
import {WeatherAPI} from 'lib/api';
import WeatherActions from 'constants/WeatherConstants';

const getWeatherByLocation = createAction(
  WeatherActions.GET_WEATHER_BY_LOCA,
  WeatherAPI.getWeatherByLocation
);

export {getWeatherByLocation};

const getWeatherByName = createAction(
  WeatherActions.GET_WEATHER_BY_NAME,
  WeatherAPI.getWeatherByName
);

export {getWeatherByName};

const clearWeather = createAction(
  WeatherActions.CLEAR_WEATHER
);

export {clearWeather};
