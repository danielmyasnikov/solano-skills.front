import React from 'react';
import styles from './styles.module.less';
import Header from '@components/header';
import HeaderExercise from '@components/headerExercise'

const Container = ({ Component, headerVariant }) => (
  <div className={styles.wrapper}>
    {headerVariant === 'exercise' ? <HeaderExercise /> : <Header />}
    <div className={styles.container}>
      <Component />
    </div>
  </div>
);

export default Container;
