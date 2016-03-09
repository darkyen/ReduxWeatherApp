
import 'styles/App.scss';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  getWeatherByName,
  getWeatherByLocation,
  clearWeather
} from 'actions/WeatherActions';
const yeomanImage = require('../images/yeoman.png');

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLocation: (coor) => dispatch(getWeatherByLocation(coor)),
    onQuery: (name) => dispatch(getWeatherByName(name)),
    onBack: () => dispatch(clearWeather())
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  render() {
    return (
      <div className="index">
        <img
          src={yeomanImage}
          alt="Yeoman Generator"
        />
      </div>
    );
  }
}

export default App;
