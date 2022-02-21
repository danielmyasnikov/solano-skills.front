import React from 'react';
import { Link } from 'react-router-dom';
import FooterLogo from '@assets/homepage/FooterLogo';
import styles from './styles.module.less';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__logo}>
          <FooterLogo />
        </div>
        <div className={styles.footer__menu}>
          <Link to="/courses">Обучение</Link>
          <Link to="/tariff">Тарифы</Link>
          <Link to="/support">Поддержка</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
