import React, {Component} from 'react';
import Modal from 'react-modal';

export default class GeoLocationView extends Component{

  render(){
    const {onLocationDenied, style, isOpen} = this.props;
    const props = {
      onRequestClose: onLocationDenied,
      style, isOpen
    };

    return <Modal {...props}>
            <div className="app-modal app-modal--open app-modal--info">
              <p>In order to find your weather data we need to find your
              current location, Accepting will allow us to fetch your location.
              Otherwise you can simply use your zip code.</p>
              <div className="app-modal__options">
                <button
                  onClick={() => this.props.onLocationDenied()}
                  className="button button-clear"
                >Deny</button>
                <button
                  onClick={() => this.props.onLocationAccepted()}
                  className="button button-clear"
                >Allow</button>
              </div>
            </div>
           </Modal>;
  }

}
