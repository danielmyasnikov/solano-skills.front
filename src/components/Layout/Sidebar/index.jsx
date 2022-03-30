import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import styles from './styles.module.less';
import { profileItems, studyItems } from './menuItems';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import { menuTheme } from '../../mui/theme';
import Button from '@components/mui/button';
import Logo from '@assets/Logo';
import cn from 'classnames';
import { useWindowWidth } from '@react-hook/window-size';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useRef } from 'react';
import { selectIsAuth } from '@store/profile/selector';
import { selectSidebar } from '@store/global/layout.selectors';
import { closeSidebar, openSidebar } from '@store/global/layout';

const Sidebar = ({ sidebarFixed, headerTarget, onUpdateSubscription }) => {
  const location = useLocation();
  const sidebarRef = useRef();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('');
  const [isDesktop, setIsDesktop] = useState('');

  const isAuth = useSelector(selectIsAuth);
  const isOpen = useSelector(selectSidebar);

  const windowWidth = useWindowWidth();
  const breakpoint = 1300;

  const handleMouseClick = (event) => {
    if (
      !sidebarRef?.current?.contains(event.target) &&
      !headerTarget.current.contains(event.target)
    ) {
      dispatch(closeSidebar({}));
    }
  };

  const handleUpdateSubscription = () => onUpdateSubscription();

  const renderStudyItems = studyItems.map(({ label, icon }) => (
    <Box key={label} sx={{ margin: '0 20px' }}>
      <List>
        <ListItem
          onClick={() => setActiveTab(label)}
          className={activeTab === label ? styles.activeTab : ''}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      </List>
    </Box>
  ));

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  useEffect(() => {
    if (!sidebarFixed || !isDesktop) {
      document.addEventListener('mousedown', handleMouseClick);
      return () => {
        document.removeEventListener('mousedown', handleMouseClick);
      };
    }
  });

  useEffect(() => {
    if (isDesktop && sidebarFixed) {
      dispatch(openSidebar({}));
    } else {
      dispatch(closeSidebar({}));
    }
  }, [isDesktop]);

  useEffect(() => {
    if (sidebarFixed) {
      setIsDesktop(windowWidth > breakpoint);
    }
  }, [windowWidth, sidebarFixed]);

  return (
    <ThemeProvider theme={menuTheme}>
      <div
        className={cn({
          [styles.modal]: !sidebarFixed,
          [styles.modalFixed]: sidebarFixed,
          [styles.modalOpened]: isOpen,
        })}
      >
        <div
          className={cn({
            [styles.backdrop]: !sidebarFixed && isOpen,
            [styles.backdropFixed]: sidebarFixed && isOpen,
          })}
        />
        <div
          ref={sidebarRef}
          className={cn(styles.sidebar, {
            [styles.sidebarOpened]: isOpen,
          })}
        >
          <div className={styles.content}>
            <div className={styles.items}>
              {!sidebarFixed && (
                <Box className={styles.logo}>
                  <Link to={isAuth ? '/courses' : '/'}>
                    <Logo />
                  </Link>
                </Box>
              )}
              <Box className={styles.label}>Профиль</Box>
              {profileItems.map(({ label, link, icon }) => (
                <Link
                  key={label}
                  to={link}
                  className={cn({ [styles.hideLink]: label === 'Сертификаты' && !isAuth })}
                >
                  <Box sx={{ margin: '0 20px' }}>
                    <List>
                      <ListItem
                        onClick={() => setActiveTab(link)}
                        className={activeTab === link ? styles.activeTab : ''}
                      >
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={label} />
                      </ListItem>
                    </List>
                  </Box>
                </Link>
              ))}
              <Divider />
              <div className={styles.studing}>
                <div className={styles.tooltip}>Данный раздел будет доступен с 1 Июля</div>
                <Box className={styles.label}>Обучение</Box>
                {renderStudyItems}
              </div>
            </div>
            {isAuth && (
              <Button
                className={styles.btn}
                variant="outlineGreen"
                onClick={handleUpdateSubscription}
              >
                Обновить подписку
              </Button>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Sidebar;
