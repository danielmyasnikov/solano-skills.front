import { Link } from 'react-router-dom';
import styles from './styles.module.less';
import HeaderLogo from '@assets/homepage/HeaderLogo';
import Burger from '@assets/Burger';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '@store/profile/selector';
import { Button } from '@mui/material';

const HeaderHome = ({ handleBurger }) => {
  const isAuth = useSelector(selectIsAuth);
  return (
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
          {!isAuth && (
            <>
              <Link to={'/sign-in'}>
                <Button variant="outlinePurple">Войти</Button>
              </Link>
              <Link to={'/registration'}>
                <Button variant="containedPurple">Зарегистрироваться</Button>
              </Link>
            </>
          )}
          <div className={styles.header__burger} onClick={handleBurger}>
            <Burger />
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderHome;
