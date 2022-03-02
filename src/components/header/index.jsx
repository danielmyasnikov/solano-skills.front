import React, { Fragment, useState } from 'react';
import { ModalTariffSelection } from './ModalTariffSelection';
import styles from './styles.module.less';
import Button from '@components/mui/button';
import Input from '@components/mui/inputSearch';
import Logo from '@assets/Logo';
import Burger from '@assets/Burger';
import ArrowDown from '@assets/ArrowDown';
import useDebounce from '../hooks/useDebounce';
import { selectProfile } from '@store/profile/selector';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ headerRef, handleSidebar }) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [showModal, setshowModal] = useState(false);

  const handleShowModal = () => setshowModal(!showModal);

  const profile = useSelector(selectProfile);

  function search() {}

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <>
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
              <Input value={searchValue} onChange={(e) => handleSearch(e)} placeholder="Поиск..." />
            </div>
          </div>
          <div className={styles.headerItem}>
            <Button variant="containedGreen" onClick={handleShowModal}>
              Обновить тариф
            </Button>
            <Link to="/profile">
              <div className={styles.profile}>
                <img src={profile.avatar_cloudinary_url} alt="avatar" />
                <ArrowDown />
              </div>
            </Link>
          </div>
        </header>
      </div>
      <ModalTariffSelection handleClick={handleShowModal} open={showModal} />
    </>
  );
};

export default Header;
