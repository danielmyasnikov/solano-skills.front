import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

// import * as Sentry from '@sentry/react';

import Container from './components/container';

import { routes } from './routes';
import { Page404 } from '@components/page404';

import { useDispatch, useSelector } from 'react-redux';

import * as AuthStore from '@store/auth';
import { getProfile } from '@store/profile/actions';

import styles from './app.module.css';
import './index.less';

function App() {
  const dispatch = useDispatch();

  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const client = localStorage.getItem('client');
    const accessToken = localStorage.getItem('access-token');
    const expiry = localStorage.getItem('expiry');

    dispatch(
      getProfile({
        headers: {
          uid,
          client,
          'access-token': accessToken,
        },
      }),
    );

    if (!!uid && !!client && !!accessToken && !!expiry) {
      dispatch(AuthStore.Actions.setLocalHeaders({ client, uid, 'access-token': accessToken }));
      if (Number(expiry) > Math.round(new Date().getTime() / 1000)) {
        // todo
      }
    }
  }, []);

  useEffect(() => {
    if (headers.uid && headers.client && headers['access-token']) {
      dispatch(getProfile({ headers }));
    }
  }, [headers]);

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

// export default Sentry.withProfiler(App);
export default App;
