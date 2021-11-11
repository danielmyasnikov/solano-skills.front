import React from 'react';
import styles from './styles.module.less';
import Header from '@components/header';
import Menu from '../mui/menu';

const Container = ({ Component }) => (
  <div className={styles.wrapper}>
    <Header />
    <div className={styles.container}>
      <Component />
    </div>
  </div>
);

export default Container;
