import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '@components/mui/button';
import styles from './styles.module.less';
import HeaderLogo from '@assets/homepage/HeaderLogo';
import Burger from '@assets/Burger';

const HeaderHome = ({ handleBurger }) => (
  <Fragment>
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.header__block}>
          <div className={styles.header__logo}>
            <Link to="/">
              <HeaderLogo />
            </Link>
          </div>
          <div className={styles.header__menu}>
            <Link to="/courses">Обучение</Link>
            <Link to="/tariff">Тарифы</Link>
            <Link to="/support">Поддержка</Link>
          </div>
        </div>
        <div className={styles.header__block}>
          <Link to={'/sing-in'}>
            <Button variant="outlinePurple">Войти</Button>
          </Link>
          <Link to={'/registration'}>
            <Button variant="containedPurple">Зарегистрироваться</Button>
          </Link>
          <div className={styles.header__burger} onClick={() => handleBurger}>
            <Burger />
          </div>
        </div>
      </header>
    </div>
  </Fragment>
);

export default HeaderHome;
