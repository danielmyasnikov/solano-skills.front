import React, { useEffect, useState } from 'react';
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
import { useRef } from 'react';

const Sidebar = ({ sidebarFixed, isSidebarOpen, closeSidebar, openSidebar, headerTarget }) => {
  const [activeTab, setActiveTab] = useState('');
  const [isDesktop, setIsDesktop] = useState('');
  const location = useLocation();
  const sidebarRef = useRef();
  const windowWidth = useWindowWidth();
  const breakpoint = 1300;

  const handleMouseClick = (event) => {
    if (
      !sidebarRef?.current?.contains(event.target) &&
      !headerTarget.current.contains(event.target)
    ) {
      closeSidebar();
    }
  };

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
      setIsDesktop(windowWidth > breakpoint ? true : false);
    }
  }, [windowWidth, sidebarFixed]);

  const modalSidebarFixedClassNames = cn({
    [styles.modal]: !sidebarFixed,
    [styles.modalFixed]: sidebarFixed,
    [styles.modalOpened]: isSidebarOpen,
  });
  const backdropSidebarFixedClassNames = cn({
    [styles.backdrop]: !sidebarFixed && isSidebarOpen,
    [styles.backdropFixed]: sidebarFixed && isSidebarOpen,
  });

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
              {profileItems.map((item) => (
                <React.Fragment key={item.label}>
                  <Link to={item.link}>
                    <Box
                      sx={{
                        margin: '0 20px',
                      }}
                    >
                      <List>
                        <ListItem
                          onClick={() => setActiveTab(item.link)}
                          className={activeTab === item.link ? styles.activeTab : ''}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.label} />
                        </ListItem>
                      </List>
                    </Box>
                  </Link>
                </React.Fragment>
              ))}
              <Divider />
              <Box className={styles.label}>Обучение</Box>
              {studyItems.map((item) => (
                <React.Fragment key={item.label}>
                  <Box
                    sx={{
                      margin: '0 20px',
                    }}
                  >
                    <List>
                      <ListItem
                        onClick={() => setActiveTab(item.label)}
                        className={activeTab === item.label ? styles.activeTab : ''}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    </List>
                  </Box>
                </React.Fragment>
              ))}
            </div>
            <Button className={styles.btn} variant="outlineGreen">
              Обновить подписку
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Sidebar;
