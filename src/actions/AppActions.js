import {createAction} from 'redux-actions';
import AppConstants from 'constants/AppConstants';

const locationFailed = createAction(
  AppConstants.APP_LOCATION_FAILED,
);

const clearWeather = createAction(
  AppConstants.CLEAR_WEATHER
);

export {locationFailed, clearWeather};
