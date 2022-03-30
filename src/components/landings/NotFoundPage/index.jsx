import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderHome from '../../Layout/headers/HomeHeader';
import NotFound from '@assets/NotFound';
import NotFoundMini from '@assets/NotFoundMini';
import Button from '@components/mui/button';
import styles from './styles.module.less';
import BurgerMenu from '@components/common/burgerMenu';
import { selectIsAuth } from '@store/profile/selector';

export const NotFoundPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const isAuth = useSelector(selectIsAuth);

  const handleBurger = () => setShowMenu(!showMenu);

  return (
    <div className={styles.wrapper}>
      <HeaderHome handleBurger={handleBurger} isAuth={isAuth} />
      <BurgerMenu isShow={showMenu} handleBurger={handleBurger} />
      <div className={styles.content}>
        <div>Упс! Что-то пошло не так!</div>
        <div>Пожалуйста, вернитесь на главную страницу и попробуйте заново.</div>
        {isAuth ? (
          <Link to="/courses">
            <Button variant={'containedPurple'}>К курсам</Button>
          </Link>
        ) : (
          <Link to="/">
            <Button variant={'containedPurple'}>На главную</Button>
          </Link>
        )}
      </div>
      <div className={styles.notFound}>
        <NotFound />
      </div>
      <div className={styles.notFoundMini}>
        <NotFoundMini />
      </div>
    </div>
  );
};
