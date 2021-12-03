import React, { useEffect } from 'react';
import { Route, useHistory, Redirect } from 'react-router-dom';
import './index.less';
import { Registration } from './components/auth/registration';
import { Authorization } from './components/auth/authorization';
import Container from './components/container';
import { routes } from './routes';
import { useSelector, useDispatch } from 'react-redux';
import styles from './app.module.css';
import * as AuthStore from '@store/auth';

export default function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const uid = localStorage.getItem('uid');
  const client = localStorage.getItem('client');
  const accessToken = localStorage.getItem('access-token');

  const isLogIn = !uid && !client && !accessToken;

  useEffect(() => {
    if (headers.uid && headers.client && headers['access-token']) {
      history.push('/courses');
    }
  }, [headers]);

  useEffect(() => {
    const expiry = localStorage.getItem('expiry');
    if (!!uid && !!client && !!accessToken && !!expiry) {
      const headersLocal = { client, uid, 'access-token': accessToken };
      dispatch(AuthStore.Actions.setLocalHeaders(headersLocal));
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      {isLogIn && <Redirect to="/sing-in" />}

      <Route exact path={'/registration'}>
        <Registration />
      </Route>
      <Route exact path={'/sing-in'}>
        <Authorization />
      </Route>

      {routes.map((route, i, headerVariant) => (
        <Route exact={route.exact} path={route.path} key={route.path}>
          <Container variant={headerVariant} key={i} {...route} Component={route.component} />
        </Route>
      ))}
    </div>
  );
}
