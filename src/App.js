import React, { Component } from 'react';
import './App.css';
import FormWidget from './FormWidget';

class App extends Component {
  render() {
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
    // TODO: implement
    window.alert("TODO: Handle this zipcode: " + zip)
  }
}

export default App;