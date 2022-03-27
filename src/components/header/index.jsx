import React, { useEffect, useState } from 'react';

import useDebounce from '../hooks/useDebounce';

import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { selectIsAuth, selectProfile } from '@store/profile/selector';

import { ModalActionMenu } from './ModalActionMenu';
import { ModalTariffSelection } from './ModalTariffSelection';
import Button from '@components/mui/button';
import Input from '@components/mui/inputSearch';
import { Preloader } from '../mui/preloader';

import Logo from '@assets/Logo';
import DefaultAvatar from '@assets/defaultUserAvatarSmall.png';
import Burger from '@assets/Burger';
import ArrowDown from '@assets/ArrowDown';

import cn from 'classnames';

import styles from './styles.module.less';

const Header = ({ headerRef, handleSidebar, isShowModal, onCloseModal, onSupportReport }) => {
  const [searchValue, setSearchValue] = useState('');
  const isAuth = useSelector(selectIsAuth);
  const debouncedSearch = useDebounce(search, 500);
  const [showModal, setshowModal] = useState(false);
  const [showMenuModal, setshowMenuModal] = useState(false);

  const history = useHistory();

  const registerRouteHandler = () => history.push(`/registration`);

  const handleShowModal = () => {
    onCloseModal();
    setshowModal(!showModal);
  };

  const profile = useSelector(selectProfile);

  function search() {}

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const menuHandler = () => {
    setshowMenuModal(!showMenuModal);
  };

  useEffect(() => setshowModal(isShowModal), [isShowModal]);

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
            {(isAuth && (
              <>
                <Button variant="containedGreen" onClick={handleShowModal}>
                  Обновить тариф
                </Button>
                <div
                  className={cn(styles.profile, { [styles.profileRotate]: showMenuModal })}
                  onClick={menuHandler}
                >
                  {(Object.keys(profile).length !== 0 && (
                    <img
                      src={
                        (profile.avatar_cloudinary_url && profile.avatar_cloudinary_url) ||
                        DefaultAvatar
                      }
                      alt="avatar"
                    />
                  )) || (
                    <div>
                      <Preloader size="50px" />
                    </div>
                  )}
                  <ArrowDown />
                </div>
              </>
            )) || (
              <Button variant="containedGreen" onClick={registerRouteHandler}>
                Зарегистрироваться
              </Button>
            )}
          </div>
        </header>
      </div>
      <ModalTariffSelection handleClick={handleShowModal} open={showModal} />
      {showMenuModal && (
        <ModalActionMenu
          totalXP={profile.xp}
          onSupport={onSupportReport}
          onOutsideClick={() => setshowMenuModal(!showMenuModal)}
          onCloseMenu={() => setshowMenuModal(!showMenuModal)}
        />
      )}
    </>
  );
};

export default Header;
