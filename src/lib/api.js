import fetch from 'whatwg-fetch';
import config from 'config';

const handleHTTPResponse = (response) => {
  if(response.status >= 200 && response.status < 300){
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const WeatherAPI = {
  BASE_URL: `https://api.openweathermap.org/data/2.5/weather?APPID=${config.OWM_APP_ID}`,
  urlByLatLong : (lat, long)  => `${WeatherAPI.BASE_URL}&lat=${lat}&lon=${long}`,
  urlByName: (name) => `${WeatherAPI.BASE_URL}&q=${name}`,
  getWeatherByName({name}) {
    const url = WeatherAPI.urlByName(name);
    return fetch(url).then(handleHTTPResponse);
  },
  getWeatherByLocation({lat, long}) {
    const url = WeatherAPI.urlByLatLong(lat, long);
    return fetch(url).then(handleHTTPResponse);
  }
};

export {WeatherAPI};

const PlacesAPI = {
  BASE_URL : 'https://'
  // getSuggestions(query){
  //
  // },
  // getPlace(query){
  //
  // }
};

export {PlacesAPI};
