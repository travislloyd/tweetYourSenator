import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../App';
import ReactTestUtils from 'react-dom/test-utils'; 

const testSenators = [
  	{ nameText: "Senator Name 1", value: "@SenatorHandle1", displayValue: true },
	{ nameText: "Senator Name 2", value: "@SenatorHandle2", displayValue: true }
]

const testAddressState = "NY"
const testSelectedSenator= testSenators[0].value





test('App renders the default FormWidget', () => {
  // Render the app
  const app = render(<App/>);

  expect(app.find(".App-title").text()).toEqual("TWEET YOUR SENATOR");

  expect(app.find(".FormWidget-title").text()).toEqual("What's your zip code?");
  expect(app.find(".FormWidget-button").text()).toEqual("Find my congressman");
});

test('App renders the FormWidget with senators when they are present', () => {
  const app = render(<App senators={ testSenators } addressState={ testAddressState }/>);

  expect(app.find(".App-title").text()).toEqual("TWEET YOUR SENATOR");

  expect(app.find(".FormWidget-title").text()).toEqual("Which " + testAddressState + " Senator would you like to tweet?");
  expect(app.find(".FormWidget-button").text()).toEqual("On to the tweet");

  expect(app.find(".FormWidget-listItem-label__name").text()).toContain(testSenators[0].nameText)
  expect(app.find(".FormWidget-listItem-label__name").text()).toContain(testSenators[1].nameText)
});

test('App renders the FormWidget with tweets when a selected senator is present', () => {
  const tweets = [
    "Hey " + testSelectedSenator + " trends for #GivingTuesday show people gearing up in August, start early! https://wholewhale.com via @wholewhale",
    "The best ideas are not in the room, " + testSelectedSenator + ". Find great fundraising supporter stories for #givingtuesday https://wholewhale.com via @wholewhale"
  ]

  const app = render(<App senators={ testSenators } addressState={ testAddressState } selectedSenator={ testSelectedSenator }/>);

  expect(app.find(".App-title").text()).toEqual("TWEET YOUR SENATOR");

  expect(app.find(".FormWidget-title").text()).toEqual("Select your tweet");
  expect(app.find(".FormWidget-button").text()).toEqual("Tweet away!");

  expect(app.find(".FormWidget-listItem-label__value").text()).toContain(tweets[0])
  expect(app.find(".FormWidget-listItem-label__value").text()).toContain(tweets[1])
});