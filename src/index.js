import 'core-js/fn/object/assign';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from 'components/Main';
import {handleActions} from 'redux-actions';
import weatherReducers from 'reducers/weatherReducer';
import appUIReducers from 'reducers/appUIReducer';
// import autoCompleteReducers from 'reducers/autoCompleteReducers';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {Provider} from 'react-redux';
import promiseMiddleware from 'redux-promised';
import WeatherConstants from 'constants/WeatherConstants';
import createLogger from 'redux-logger';
import ReduxSimpleStorage from 'redux-simple-localstorage';

const {read, write} = ReduxSimpleStorage('redux-weather-data-store');
const defaultState = read() || {
  app: {
    source: WeatherConstants.SOURCE_LOCATION,
    hasPermission: false,
    query: ''
  },
  weather: {
    isRequesting: false,
    hasLoaded: false,
    forecast: {},
    current: {}
  }
};

const logger = createLogger();
const appUIReducer = handleActions(appUIReducers, defaultState.app);
const weatherReducer = handleActions(weatherReducers, defaultState.weather);
const rootReducer =   combineReducers({
  weather: weatherReducer,
  app: appUIReducer
});

const store = createStore(rootReducer, applyMiddleware(promiseMiddleware, logger, write));
// Render the main component into the dom
// ReactDOM.render(<App />, document.getElementById('app'));

Modal.setAppElement(document.getElementById('modal-box'));
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'));
