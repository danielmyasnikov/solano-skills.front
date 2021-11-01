import React from 'react';
import { Menu } from '@components/menu';
import styles from './styles.module.less';

const Container = ({ Component }) => (
  <div className={styles.wrapper}>
    <Menu />
    <div className={styles.container}>
      <Component />
    </div>
  </div>
);

export default Container;
