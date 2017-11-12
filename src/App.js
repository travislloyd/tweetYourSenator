import React, { Component } from 'react';
import CivicDataAPI from './CivicDataAPI';
import './App.css';
import FormWidget from './FormWidget';

class App extends Component {
  constructor(props){
    super(props)
    this.civicDataAPI = new CivicDataAPI(props.apiKey)
    this.state = {senators: []}
  }

  render() {
    //TODO render next widget when senators are present
    console.log(this.state.senators)
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TWEET YOUR SENATOR</h1>
        </header>
        <div className="App-content">
          { this._buildZipcodeSelectWidget() }
        </div>
      </div>
    )
  }

  _buildZipcodeSelectWidget(){
    return (
        <FormWidget header="What's your zip code?"
                    cta="Find my congressman"
                    ctaFunction={ ((zip) => this._handleZipcodeInput(zip) ) }/>
    )
  }

  _handleZipcodeInput(zip){
    const promise = this.civicDataAPI.getSenatorsForZipcode(zip)

    promise.then((successData) => {
      this.setState({ addressState: successData.addressState, senators: successData.senators })
    })
    .catch((errorMsg) => {
      alert(errorMsg)
    })
  }
}

export default App;