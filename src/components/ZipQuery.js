import React,{Component} from 'react';
import Modal from 'react-modal';
const data = require('country-list/data.json');

export default class ZipComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      country: 'IN',
      zip: ''
    };
  }
  handleCountryChange(e){
    const country = e.target.value;
    this.setState({country});
  }
  handleZipChange(e){
    const zip = e.target.value;
    this.setState({zip});
  }

  render(){
    const {isOpen, style} = this.props;
    const {zip, country} = this.state;
    const props = {
      isOpen, style
    };
    return <Modal {...props}>
            <div className="app-modal app-modal--open app-modal--info">
              <div className="app__zip-selector">
                <div>
                  <label>Zip Code</label>
                  <input
                    value={zip}
                    onChange={e => this.handleZipChange(e)}
                    placeholder="482001"
                    autofocus={true}
                    type="text"
                  />
                </div>
                <div>
                  <label>Country</label>
                  <select
                    className="country-chooser"
                    value={country}
                    onChange={e => this.handleCountryChange(e)}
                  >{data.map(country => {
                    return <option
                              key={country.code}
                              value={country.code}
                            >{country.name}</option>;
                  })}</select>
                </div>
              </div>
              <div className="app-modal__options">
                <button onClick={() => this.props.onQuery(zip, country)} className="button-clear">Accept</button>
              </div>
             </div>
            </Modal>;
  }
}
