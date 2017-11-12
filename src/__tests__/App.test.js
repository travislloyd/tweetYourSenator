import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../App';
import ReactTestUtils from 'react-dom/test-utils'; 

test('App renders the default FormWidget', () => {
  // Render the app
  const app = render(<App/>);

  expect(app.find(".App-title").text()).toEqual("TWEET YOUR SENATOR");

  expect(app.find(".FormWidget-title").text()).toEqual("What's your zip code?");
  expect(app.find(".FormWidget-button").text()).toEqual("Find my congressman");
});

test('App renders the FormWidget with senators when they are present', () => {
  const addressState = "NY"
  const senators = [
  	{ nameText: "Senator Name 1", value: "@SenatorHandle1", displayValue: true },
  	{ nameText: "Senator Name 2", value: "@SenatorHandle2", displayValue: true }
  ]

  const app = render(<App senators={ senators } addressState={ addressState }/>);

  expect(app.find(".App-title").text()).toEqual("TWEET YOUR SENATOR");

  expect(app.find(".FormWidget-title").text()).toEqual("Which " + addressState + " Senator would you like to tweet?");
  expect(app.find(".FormWidget-button").text()).toEqual("On to the tweet");

  expect(app.find(".FormWidget-listItem-label__name").text()).toContain(senators[0].nameText)
  expect(app.find(".FormWidget-listItem-label__name").text()).toContain(senators[1].nameText)
});