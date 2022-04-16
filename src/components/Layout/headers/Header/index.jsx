import { useRef, useState } from 'react';

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
import { Button, ClickAwayListener } from '@mui/material';
import Search from '@components/mui/Search';
import SearchBox from '@components/Layout/headers/Header/SearchBox';
import { useGetCoursesQuery } from '@src/features/courses/courses.api.ts';

const Header = ({ headerRef }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const { data: courses } = useGetCoursesQuery();
  const [actionMenu, setShowActionMenu] = useState(false);
  const history = useHistory();

  const registerRouteHandler = () => history.push(`/sign-up`);

  const handleShowModal = () => {
    dispatch(openTariffsModal({}));
    setShowActionMenu(false);
  };

  const profile = useSelector(selectProfile);

  const handleSearch = (e) => {
    setShowSearchBox(true);
    setSearchValue(e.target.value);
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
              <ClickAwayListener onClickAway={() => setShowSearchBox(false)}>
                <div>
                  <Search
                    value={searchValue}
                    onChange={(e) => handleSearch(e)}
                    onFocus={() => {
                      setShowSearchBox(true);
                    }}
                    placeholder="Поиск..."
                  />
                  <SearchBox courses={courses} searchValue={searchValue} isShow={showSearchBox} />
                </div>
              </ClickAwayListener>
            </div>
          </div>
          <div className={styles.headerItem}>
            {isAuth ? (
              <>
                <Button variant="containedGreen" onClick={handleShowModal}>
                  {profile.subscription_type ? (
                    <>
                      {profile.subscription_type === 'month' ? 'Месячный тариф' : 'Годовой тариф'}
                    </>
                  ) : (
                    'Активировать тариф'
                  )}
                </Button>
                <div
                  className={cn(styles.profile, { [styles.profileRotate]: actionMenu })}
                  onClick={menuHandler}
                >
                  {(Object.keys(profile).length !== 0 && (
                    <img src={profile.avatar_url || DefaultAvatar} alt="Аватар пользователя" />
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
        {actionMenu && <ActionMenu />}
      </div>
    </>
  );
};

export default Header;
