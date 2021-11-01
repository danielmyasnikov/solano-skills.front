import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
// let videojs = require('video.js');
// require("videojs-resolution-switcher");

// window.videojs = videojs

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
