import React from 'react';
import styles from './styles.module.less';
import Header from '@components/header';
import HeaderExercise from '@components/headerExercise'
import Menu from '../mui/menu';

const Container = ({ Component, headerVariant }) => (
  <div className={styles.wrapper}>
    {headerVariant === 'exercise' ? <Header /> : <HeaderExercise />}
    <div className={styles.container}>
      <Component />
    </div>
  </div>
);

export default Container;
