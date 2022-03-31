import { useLayoutEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '@components/Layout';

import { routes } from './routes';
import { NotFoundPage } from '@components/NotFoundPage';

import { useDispatch } from 'react-redux';

import * as AuthStore from '@store/auth';
import { getProfile } from '@store/profile/actions';

import styles from './app.module.css';
import './index.less';
import { ModalPortal } from '@components/modals/ModalPortal';
import { ThemeProvider } from '@mui/material';

import { theme } from './theme';

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
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

    dispatch(AuthStore.Actions.setLocalHeaders({ client, uid, 'access-token': accessToken }));
    if (Number(expiry) > Math.round(new Date().getTime() / 1000)) {
      // todo
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.wrapper}>
        <Switch>
          {routes.map((route, i, headerVariant) => (
            <Route exact={route.exact} path={route.path} key={route.path}>
              <>
                {route.wrap ? (
                  <Layout variant={headerVariant} key={i} {...route}>
                    <route.component />
                  </Layout>
                ) : (
                  <route.component />
                )}
                <ModalPortal />
              </>
            </Route>
          ))}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
