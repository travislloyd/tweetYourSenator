import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// This is hardcoded here to simply the app, but if it were determined that this key needed to be kept secret
// a dynamic server could be used to make the calls to the API and the key would live there.
const API_KEY = "AIzaSyADZbxCzG3ym0rssgT8JVWJTWeUa0Xl_mg";

ReactDOM.render(<App apiKey={ API_KEY }/>, document.getElementById('root'));
registerServiceWorker();