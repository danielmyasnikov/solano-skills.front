import React, { Fragment, useEffect, useState } from 'react';
import {Modal} from './modal'
import styles from './styles.module.less';
import Button from '@components/mui/button';
import Input from '@components/mui/inputSearch';
import Logo from '@assets/Logo';
import Burger from '@assets/Burger';
import ArrowDown from '@assets/ArrowDown';
import AvatarDefault from '@assets/avatarDefault.png';
import useDebounce from '../hooks/useDebounce';
import { Link } from 'react-router-dom';

const Header = ({ headerRef, handleSidebar }) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };
  function search() {}

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };
  
  return (
    <Fragment>
      <Modal handleClick={handleModal} open={openModal} />
      <div className={styles.wrapper}>
        <header ref={headerRef} className={styles.header}>
          <div className={styles.headerItem}>
            <div className={styles.logo}>
              <Logo />
            </div>
            <div onClick={handleSidebar} className={styles.burgerMenu}>
              <Burger />
            </div>
            <div className={styles.search}>
              <Input
                value={searchValue}
                onChange={(e) => handleSearch(e)}
                placeholder="Search..."
              />
            </div>
          </div>
          <div className={styles.headerItem}>
            <Button variant="containedGreen" onClick={handleModal}>
              Обновить тариф
            </Button>
            <Link to="/profile">
              <div className={styles.profile}>
                <img src={AvatarDefault} />
                <ArrowDown />
              </div>
            </Link>
          </div>
        </header>
      </div>
    </Fragment>
  );
};

export default Header;
