import 'core-js/fn/object/assign';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from 'components/Main';
import {handleActions} from 'redux-actions';
import weatherReducers from 'reducers/weatherReducer';
// import autoCompleteReducers from 'reducers/autoCompleteReducers';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import promiseMiddleware from 'redux-promised';
let oldState = null;

// Try rehydrating
if( localStorage.oldState ) {
  try{
    oldState = JSON.parse(localStorage.oldState);
  }catch(e){
    console.log('Invalid state found in store');
  }
}

const defaultState = oldState || {
  app: {
    hasPermission: false,
    firstRun: true,
    source: '',
    query: ''
  },
  weather: {
    isRequesting: false,
    forecast: {},
    current: {}
  },
  autoComplete: {
    suggestions : [],
    isLoading: false
  }
};

const compoundReducer = handleActions({
  // ...appUIReducers,
  ...weatherReducers
}, defaultState);

const store = createStore(compoundReducer, applyMiddleware(promiseMiddleware));
// Render the main component into the dom
// ReactDOM.render(<App />, document.getElementById('app'));

Modal.setAppElement(document.getElementById('modal-box'));
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'));
