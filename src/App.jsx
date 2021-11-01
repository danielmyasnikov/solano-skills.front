import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import './index.less';
import ExercisePage from './components/exercise';
import  Container  from './components/container';
import { routes } from './routes';
import styles from './app.module.css';

export default function App() {
  console.log('http-proxy-hbjnkmlmiddleware ')
  return (
    <div className={styles.wrapper}>
      {routes.map((route, i) => (
        <Route exact={route.exact} path={route.path} key={route.path}>
          <Container key={i} {...route} Component={route.component} />
        </Route>
      ))}
    </div>
  );
}
