import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { Page404 } from './components/page404';

Sentry.init({
  dsn: 'https://8a230b62d67b406fb1096904ce34ed4d@o624741.ingest.sentry.io/6219327',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
