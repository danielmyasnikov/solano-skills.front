import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '@components/mui/button';
import styles from './styles.module.less'
import headerLogo from '@assets/homepage/headerLogo.png';

const HeaderHome = () => {
  return ( 
    <Fragment>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.header__block}>
            <div className={styles.header__logo}><img src={headerLogo}/></div>
            <div className={styles.header__menu}>
              <Link to='/courses'>Обучение</Link>
              <Link to='/tariff'>Тарифы</Link>
              <Link to='/support'>Поддержка</Link>
            </div>
          </div>
          <div className={styles.header__block}>
            <Button variant="outlinePurple">
              Войти в аккаунт
            </Button>
            <div className={styles.header__block__signUpBtn}>
              <Button variant="containedPurple" >
                Зарегистрироваться
              </Button>
            </div>
          </div>
        </header>
      </div>
    </Fragment>
  )
}
 
export default HeaderHome;