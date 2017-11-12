import React, { Component } from 'react';
import CivicDataAPI from './CivicDataAPI';
import './App.css';
import FormWidget from './FormWidget';

class App extends Component {
  constructor(props){
    super(props)
    this.civicDataAPI = new CivicDataAPI(props.apiKey)

    const senators = this.props.senators ? this.props.senators : []
    const addressState = this.props.addressState ? this.props.addressState : undefined
    
    this.state = {senators: senators, addressState: addressState}
  }

  render() {
    let appContent;

    if(this.state.senators.length === 0){
      appContent = this._buildZipcodeSelectWidget()
    } else {
      appContent = this._buildSenatorSelectWidget()
    } 

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TWEET YOUR SENATOR</h1>
        </header>
        <div className="App-content">
          { appContent }
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

  _buildSenatorSelectWidget(){
    return (
        <FormWidget header={ "Which " + this.state.addressState + " Senator would you like to tweet?" }
            cta="On to the tweet"
            ctaFunction={ (twitterHandle) => this._handleSenatorSelection(twitterHandle) }
            optionsList={ this.state.senators }/>
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

  _handleSenatorSelection(senator){
    // TODO: IMPLEMENT
    console.log("Selected senator = " + senator)
  }
}

export default App;