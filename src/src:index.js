Searching 424 files for "@sentry/tracing"

/Users/user/src/_lab/deepskills/deepskills.front/src/index.js:
    7  import store from './store';
    8  // import * as Sentry from '@sentry/react';
    9: import { BrowserTracing } from '@sentry/tracing';
   10  require('dotenv').config();
   11  

1 match in 1 file


Searching 424 files for "Sentry"

/Users/user/src/_lab/deepskills/deepskills.front/src/App.jsx:
    2  import { Route, Switch } from 'react-router-dom';
    3  
    4: // import * as Sentry from '@sentry/react';
    5  
    6  import Container from './components/container';
    .
   63  }
   64  
   65: // export default Sentry.withProfiler(App);
   66  

/Users/user/src/_lab/deepskills/deepskills.front/src/index.js:
    6  import { Provider } from 'react-redux';
    7  import store from './store';
    8: // import * as Sentry from '@sentry/react';
    9: // import { BrowserTracing } from '@sentry/tracing';
   10  require('dotenv').config();
   11  
   12: // Sentry.init({
   13: //   dsn: 'https://8a230b62d67b406fb1096904ce34ed4d@o624741.ingest.sentry.io/6219327',
   14  //   integrations: [new BrowserTracing()],
   15  //   tracesSampleRate: 1.0,

8 matches across 2 files
