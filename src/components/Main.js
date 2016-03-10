
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
import WeatherConstants from 'constants/WeatherConstants';

const locationOpts = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 0
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLocationDenied: (err) => { dispatch(locationFailed(err)) },
    onLocation: (coor) => { dispatch(getWeatherByLocation(coor)) },
    onZipCode: (zip, country) => dispatch(getWeatherByZIP(zip,country)),
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
    accquireGeoLocation(){
      navigator.geolocation.getCurrentPosition(
        pos => this.props.onLocation(pos.coords),
        err => this.props.onLocationDenied(err),
        locationOpts
      );
    }

    switchToZipCode(){
      this.props.onLocationDenied();
    }

    setZipCode(zip, country){
      this.props.onZipCode(zip, country);
    }

    componentDidMount(){
      const {hasPermission, query} = this.props.app;
      if( hasPermission ){
        this.accquireGeoLocation();
      }
      if( query ){
        this.props.onZipCode(query.zip, query.country);
      }
    }

    render() {
      const {weather, app} = this.props
      const {hasPermission, query} = app;
      const pickerIsLocation  = app.source === WeatherConstants.SOURCE_LOCATION;
      const shouldShowPickers = pickerIsLocation ? hasPermission === false : !query;
      return (
        <div className="app">
          <GeoLocationView
            isOpen={pickerIsLocation && shouldShowPickers}
            style={baseStyles}
            onLocationAccepted={e => this.accquireGeoLocation()}
            onLocationDenied={e => this.switchToZipCode()}
          ></GeoLocationView>
          <ZipQuery
            isOpen={!pickerIsLocation && shouldShowPickers}
            style={baseStyles}
            onQuery={(zip, country) => this.setZipCode(zip, country)}
          ></ZipQuery>
          <Weather {...weather} onReset={this.props.onBack} />
        </div>
      );
    }
  }
)

export default App;
