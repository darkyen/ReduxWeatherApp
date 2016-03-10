import config from 'config';
// fetch isn't webpack / browserify es6
// freindly.

const handleHTTPResponse = (response) => {
  if(response.status >= 200 && response.status < 300){
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const hydrateJSON = (response) => response.json();

const WeatherAPI = {
  UNIT_SYSTEM: config.defaultUnitSystem,
  baseUrl: () => `http://api.openweathermap.org/data/2.5/weather?APPID=${config.OWM_APP_ID}&units=${WeatherAPI.UNIT_SYSTEM}`,
  urlByLatLong : (lat, long)  => `${WeatherAPI.baseUrl()}&lat=${lat}&lon=${long}`,
  urlByZip: (zip, country) => `${WeatherAPI.baseUrl()}&zip=${zip},${country}`,
  getWeatherByZIP(zip, country) {
    const url = WeatherAPI.urlByZip(zip, country);
    return fetch(url).then(handleHTTPResponse).then(hydrateJSON);
  },
  getWeatherByLocation({latitude, longitude}) {
    const url = WeatherAPI.urlByLatLong(latitude, longitude);
    return fetch(url).then(handleHTTPResponse).then(hydrateJSON);
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
