import React from 'react';
import { Route } from 'react-router-dom';
import './index.less';
import  Container  from './components/container';
import { routes } from './routes';
import styles from './app.module.css';

export default function App() {
  return (
    <div className={styles.wrapper}>
      {routes.map((route, i, headerVariant) => (
        <Route exact={route.exact} path={route.path} key={route.path}>
          <Container variant={headerVariant}  key={i} {...route} Component={route.component} />
        </Route>
      ))}
    </div>
  );
}
