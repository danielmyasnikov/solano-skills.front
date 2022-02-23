import React from 'react';
import FB from '@assets/fb.png';
import Google from '@assets/google.png';
import Ya from '@assets/ya.png';
import styles from './styles.module.less';

export const SocialNetworks = () => (
  <div className={styles.wrapper}>
    <span className={styles.title}>Войти с помощью</span>
    <div className={styles.icons}>
      <a className={styles.iconWrapper} href="###">
        <img className={styles.icon} src={FB} alt="facebook" />
      </a>

      <a className={styles.iconWrapper} href="###">
        <img className={styles.icon} src={Google} alt="google" />
      </a>

      <a className={styles.iconWrapper} href="###">
        <img className={styles.icon} src={Ya} alt="yandex" />
      </a>
    </div>
  </div>
);
