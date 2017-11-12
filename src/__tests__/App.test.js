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