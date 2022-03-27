import React, { useEffect, useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import styles from './styles.module.less';
import { profileItems, studyItems } from './menuItems';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import { menuTheme } from '../theme';
import Button from '@components/mui/button';
import Logo from '@assets/Logo';
import cn from 'classnames';
import { useWindowWidth } from '@react-hook/window-size';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as AuthStore from '@store/auth';
import { useRef } from 'react';
import { selectIsAuth } from '@store/profile/selector';

const Sidebar = ({
  sidebarFixed,
  isSidebarOpen,
  closeSidebar,
  openSidebar,
  headerTarget,
  onUpdateSubscription,
}) => {
  const [activeTab, setActiveTab] = useState('');
  const [isDesktop, setIsDesktop] = useState('');

  const isAuth = useSelector(selectIsAuth);

  const location = useLocation();
  const sidebarRef = useRef();
  const windowWidth = useWindowWidth();
  const breakpoint = 1300;

  const modalSidebarFixedClassNames = cn({
    [styles.modal]: !sidebarFixed,
    [styles.modalFixed]: sidebarFixed,
    [styles.modalOpened]: isSidebarOpen,
  });
  const backdropSidebarFixedClassNames = cn({
    [styles.backdrop]: !sidebarFixed && isSidebarOpen,
    [styles.backdropFixed]: sidebarFixed && isSidebarOpen,
  });

  const handleMouseClick = (event) => {
    if (
      !sidebarRef?.current?.contains(event.target) &&
      !headerTarget.current.contains(event.target)
    ) {
      closeSidebar();
    }
  };

  const handleUpdateSubscription = () => onUpdateSubscription();

  const renderStudyItems = useMemo(() => {
    return studyItems.map(({ label, icon }) => (
      <React.Fragment key={label}>
        <Box
          sx={{
            margin: '0 20px',
          }}
        >
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
      </React.Fragment>
    ));
  }, [studyItems]);

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
      openSidebar();
    } else {
      closeSidebar();
    }
  }, [isDesktop]);

  useEffect(() => {
    if (sidebarFixed) {
      setIsDesktop(windowWidth > breakpoint);
    }
  }, [windowWidth, sidebarFixed]);

  return (
    <ThemeProvider theme={menuTheme}>
      <div className={modalSidebarFixedClassNames}>
        <div className={backdropSidebarFixedClassNames} />
        <div
          ref={sidebarRef}
          className={cn(styles.sidebar, {
            [styles.sidebarOpened]: isSidebarOpen,
          })}
        >
          <div className={styles.content}>
            <div className={styles.items}>
              {!sidebarFixed && (
                <Box className={styles.logo}>
                  <Logo />
                </Box>
              )}
              <Box className={styles.label}>Профиль</Box>
              {profileItems.map(({ label, link, icon }) => (
                <React.Fragment key={label}>
                  <Link
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
                </React.Fragment>
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
