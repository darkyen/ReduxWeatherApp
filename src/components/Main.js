
import 'styles/App.scss';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  getWeatherByZIP,
  getWeatherByLocation
} from 'actions/WeatherActions';
import {
  locationFailed,
  clearWeather
} from 'actions/AppActions';

import GeoLocationView from './GeoLocationView';
import ZipQuery from './ZipQuery';
import Weather from './Weather';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLocationDenied: (err) => { dispatch(locationFailed(err)) },
    onLocation: (coor) => { dispatch(getWeatherByLocation(coor)) },
    onQuery: (zip, country) => dispatch(getWeatherByZIP(zip,country)),
    onBack: () => dispatch(clearWeather())
  }
}
const baseStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: window.innerWidth > 768 ? 'center' : 'flex-end',
    justifyContent: 'center'
  },
  content: {
    position: 'relative',
    borderRadius: 0,
    padding: 0,
    border: 0,
    overflow: 'visible',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    width: window.innerWidth > 768 ?  400 : '100%'
  }
};

const App = connect(mapStateToProps, mapDispatchToProps)(
  class extends Component {
    render() {
      const weather = this.props.weather.isLoading === false
                        ? <Weather {...this.props.weather} />
                      : <div>Loading...</div>;
      return (
        <div className="app">
          <GeoLocationView
            isOpen={true}
            style={baseStyles}
            onLocation={this.props.onLocation}
            onLocationDenied={this.props.onLocationDenied}
          ></GeoLocationView>
          <ZipQuery
            isOpen={false}
            style={baseStyles}
          ></ZipQuery>
          {weather}
        </div>
      );
    }
  }
)

export default App;
