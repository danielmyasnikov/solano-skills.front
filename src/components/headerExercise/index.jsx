import React, { useState } from 'react';
import styles from './styles.module.less';
import MenuItems from '@components/mui/menu';
import Button from '@components/mui/button';
import Input from '@components/mui/input';
import Logo from '@assets/Logo';
import Burger from '@assets/Burger';
import ArrowDown from '@assets/ArrowDown';
import AvatarDefault from '@assets/avatarDefault.png';

const HeaderExercise = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.wrapper}>
      <MenuItems isOpen={false} />
      <header className={styles.header}>
        <div className={styles.headerItem}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div onClick={() => setIsOpen(isOpen ? false : true)} className={styles.burgerMenu}>
            <Burger />
          </div>
          <Input className={styles.search} placeholder="Search..." />
        </div>
        <div className={styles.headerItem}>
          <Button variant="containedGreen">Обновить тариф</Button>
          <div className={styles.profile}>
            <img src={AvatarDefault} />
            <ArrowDown />
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderExercise;
