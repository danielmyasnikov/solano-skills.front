import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import * as Sentry from '@sentry/react';

import Container from './components/container';

import { routes } from './routes';
import { Page404 } from './components/page404';

import { useDispatch } from 'react-redux';

import * as AuthStore from '@store/auth';

import styles from './app.module.css';
import './index.less';

function App() {
  const dispatch = useDispatch();

  const uid = localStorage.getItem('uid');
  const client = localStorage.getItem('client');
  const accessToken = localStorage.getItem('access-token');

  // const isLogIn = !uid && !client && !accessToken;

  useEffect(() => {
    const expiry = localStorage.getItem('expiry');
    if (!!uid && !!client && !!accessToken && !!expiry) {
      const headersLocal = { client, uid, 'access-token': accessToken };
      dispatch(AuthStore.Actions.setLocalHeaders(headersLocal));
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* {isLogIn && <Redirect to="/sign-in" />} */}
      <Switch>
        {routes.map((route, i, headerVariant) => (
          <Route exact={route.exact} path={route.path} key={route.path}>
            {(route.wrap && (
              <Container variant={headerVariant} key={i} {...route} Component={route.component} />
            )) || <route.component />}
          </Route>
        ))}
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

export default Sentry.withProfiler(App);
