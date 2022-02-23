import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import * as Sentry from '@sentry/react';

import { useDispatch } from 'react-redux';
import * as AuthStore from '@store/auth';
import Container from './components/container';

import { routes } from './routes';

import styles from './app.module.css';
import './index.less';

const App = () => {
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
      {/* {isLogIn && <Redirect to="/sing-in" />} */}

      {routes.map((route, headerVariant) => (
        <Route exact={route.exact} path={route.path} key={route.path}>
          {(route.wrap && (
            <Container
              variant={headerVariant}
              key={uuid()}
              {...route}
              Component={route.component}
            />
          )) || <route.component />}
        </Route>
      ))}
    </div>
  );
};

export default Sentry.withProfiler(App);
