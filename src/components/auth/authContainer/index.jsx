import React from 'react';
import Logo from '@assets/bigLogo.png';
import styles from './styles.module.less';

export const AuthContainer = ({ children }) => (
  <div className={styles.wrapper}>
    <div className={styles.logoContainer}>
      <img src={Logo} alt="" className={styles.logo} />
    </div>
    <div className={styles.container}>
      <div className={styles.content}> {children}</div>
    </div>
  </div>
);
