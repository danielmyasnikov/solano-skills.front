import React from 'react';
import styles from './styles.module.less';
import Logo from '@assets/bigLogo.png';

export const AuthContainer = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <img src={Logo} alt="" className={styles.logo} />
      </div>
      <div className={styles.container}>
        <div className={styles.content}> {children}</div>
      </div>
    </div>
  );
};
