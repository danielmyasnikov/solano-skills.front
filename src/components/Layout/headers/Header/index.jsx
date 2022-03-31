import { useState } from 'react';

import useDebounce from '../../../../hooks/useDebounce';

import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { selectIsAuth, selectProfile } from '@store/profile/selector';

import { ActionMenu } from './ActionMenu';
import { Preloader } from '../../../mui/Preloader';

import Logo from '@assets/Logo';
import DefaultAvatar from '@assets/defaultUserAvatarSmall.png';
import Burger from '@assets/Burger';
import ArrowDown from '@assets/ArrowDown';

import cn from 'classnames';

import styles from './styles.module.less';
import { toggleSidebar } from '@store/global/layout';
import { openFeedbackModal, openTariffsModal } from '@store/global/modals';
import { Button } from '@mui/material';
import Search from '@components/mui/Search';

const Header = ({ headerRef }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const isAuth = useSelector(selectIsAuth);
  const debouncedSearch = useDebounce(search, 500);
  const [actionMenu, setShowActionMenu] = useState(false);

  const history = useHistory();

  const registerRouteHandler = () => history.push(`/registration`);

  const handleShowModal = () => {
    dispatch(openTariffsModal({}));
    setShowActionMenu(false);
  };

  const profile = useSelector(selectProfile);

  function search() {}

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const menuHandler = () => {
    setShowActionMenu(!actionMenu);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <header ref={headerRef} className={styles.header}>
          <div className={styles.headerItem}>
            <div className={styles.logo}>
              <Link to={isAuth ? '/courses' : '/'}>
                <Logo />
              </Link>
            </div>
            <div onClick={() => dispatch(toggleSidebar({}))} className={styles.burgerMenu}>
              <Burger />
            </div>
            <div className={styles.search}>
              <Search
                value={searchValue}
                onChange={(e) => handleSearch(e)}
                placeholder="Поиск..."
              />
            </div>
          </div>
          <div className={styles.headerItem}>
            {isAuth ? (
              <>
                <Button variant="containedGreen" onClick={handleShowModal}>
                  Обновить тариф
                </Button>
                <div
                  className={cn(styles.profile, { [styles.profileRotate]: actionMenu })}
                  onClick={menuHandler}
                >
                  {(Object.keys(profile).length !== 0 && (
                    <img src={profile.avatar_url || DefaultAvatar} alt="avatar" />
                  )) || (
                    <div>
                      <Preloader size="50px" />
                    </div>
                  )}
                  <ArrowDown />
                </div>
              </>
            ) : (
              <Button variant="containedGreen" onClick={registerRouteHandler}>
                Зарегистрироваться
              </Button>
            )}
          </div>
        </header>
      </div>
      {actionMenu && (
        <ActionMenu
          totalXP={profile.xp}
          onSupport={() => dispatch(openFeedbackModal({}))}
          onOutsideClick={() => setShowActionMenu(!actionMenu)}
          onCloseMenu={() => setShowActionMenu(!actionMenu)}
        />
      )}
    </>
  );
};

export default Header;
