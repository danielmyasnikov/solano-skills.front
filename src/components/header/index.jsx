import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import Menu from '@components/mui/menu';
import Button from '@components/mui/button';
import Input from '@components/mui/inputSearch';
import Logo from '@assets/Logo';
import Burger from '@assets/Burger';
import ArrowDown from '@assets/ArrowDown';
import AvatarDefault from '@assets/avatarDefault.png';
import { useWindowWidth } from '@react-hook/window-size';

const Header = () => {
  const [isOpen, setIsOpen] = useState(true);
  const windowWidth = useWindowWidth()
  useEffect(() => {
    setIsOpen(windowWidth < 820 ? false : true)
  }, [windowWidth])
  return (
    <div className={styles.wrapper}>
      <Menu onClose={() => setIsOpen(false)} isOpen={isOpen} variant="mainHeader" />
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

export default Header;
