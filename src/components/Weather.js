import React, {Component} from 'react';

const CurrentWeather = ({name, main, weather}) => {
  return <div className="weather">
          <h5>{name}</h5>
          <h6>{weather[0].description}</h6>
          <h3>{main.temp}</h3>
         </div>;
}

const ForecastWeather = (props) => {
   return <div className="forecast">
          <table>
            <tbody>
              <tr>Today</tr>
              <tr>64/32</tr>
              <tr>Windy</tr>
            </tbody>
          </table>
         </div>;
}

export default class WeatherDisplay extends Component{
  render(){
    const {current, forecast} = this.props;

    return <div className="app__weather">
            <div className="app__current">
              <CurrentWeather {...current} />
            </div>
            <div className="app__forecast">
              <ForecastWeather forecast={forecast}/>
            </div>
           </div>;
  }
}
