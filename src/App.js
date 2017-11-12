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
    const selectedSenator = this.props.selectedSenator ? this.props.selectedSenator : undefined

    this.state = {senators: senators, addressState: addressState, selectedSenator: selectedSenator}
  }

  render() {
    let appContent;

    if(this.state.senators.length === 0){
      appContent = this._buildZipcodeSelectWidget()
    } else if(!this.state.selectedSenator){
      appContent = this._buildSenatorSelectWidget()
    } else {
      appContent = this._buildTweetSelectWidget()
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

  _buildTweetSelectWidget(){
    return (
        <FormWidget header="Select your tweet"
            cta="Tweet away!"
            ctaFunction={ (tweet) => this._handleTweetSelection(tweet) }
            optionsList={ this._buildTweetList() }/>
    )
  }

  _buildTweetList(){
    let tweet1 = "Hey " + this.state.selectedSenator + " trends for #GivingTuesday show people gearing up in August, start early! https://wholewhale.com via @wholewhale"
    let tweet2 = "The best ideas are not in the room, " + this.state.selectedSenator + ". Find great fundraising supporter stories for #givingtuesday https://wholewhale.com via @wholewhale"

    return [ { displayValue: true, value: tweet1 }, {displayValue: true, value: tweet2 }]
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
    this.setState({selectedSenator: senator})
  }

  _handleTweetSelection(tweet){
    window.location.href = "http://twitter.com/home?status=" + encodeURIComponent(tweet)
  }
}

export default App;