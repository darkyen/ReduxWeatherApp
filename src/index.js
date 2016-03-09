import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/Main';

import { Router, Route, browserHistory } from 'react-router'

import {handleActions} from 'redux-actions';
import weatherReducers from 'reducers/weatherReducer';
// import autoCompleteReducers from 'reducers/autoCompleteReducers';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promised';

const defaultState = {
  weather: {
    source: '',
    query: '',
    data: {},
    isRequesting: false
  },
  autoComplete: {
    suggestions : [],
    isLoading: false
  }
};

const compoundReducer = handleActions({
  // ...autoCompleteReducers,
  ...weatherReducers
}, defaultState);

createStore(compoundReducer, applyMiddleware(promiseMiddleware));
// Render the main component into the dom
// ReactDOM.render(<App />, document.getElementById('app'));
const noop = ()=>{};

const NoMatch = noop,
      GeoLocation = noop,
      QueryLocation = noop,
      WeatherPage =  noop,
      AppContainer = noop;

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/" component={GeoLocation} />
      <Route path="/name" component={QueryLocation}></Route>
      <Route path="/weather" component={WeatherPage}></Route>
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
), document.getElementById('app'));
