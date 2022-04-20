import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import styles from './styles.module.less';
import { profileItems, studyItems } from './menuItems';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { Box } from '@mui/system';
import Logo from '@assets/Logo';
import cn from 'classnames';
import { useWindowWidth } from '@react-hook/window-size';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '@store/profile/selector';
import { selectSidebar } from '@store/global/layout.selectors';
import { closeSidebar, openSidebar } from '@store/global/layout';
import { openTariffsModal } from '@store/global/modals';

const Sidebar = ({ sidebarFixed, headerTarget }) => {
  const location = useLocation();
  const sidebarRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

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

  const signInRouteHandler = () => history.push(`/sign-in`);

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

  useLayoutEffect(() => {
    if (isDesktop && sidebarFixed) {
      dispatch(openSidebar({}));
    } else {
      dispatch(closeSidebar({}));
    }
  }, [isDesktop]);

  useLayoutEffect(() => {
    if (sidebarFixed) {
      setIsDesktop(windowWidth > breakpoint);
    }
  }, [windowWidth, sidebarFixed]);

  return (
    <Drawer
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          marginTop: '73px',
          width: 250,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={isOpen}
      ref={sidebarRef}
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
          {/* <div className={styles.studing}>
            <div className={styles.tooltip}>Данный раздел будет доступен с 1 Июля</div>
            <Box className={styles.label}>Обучение</Box>
            {renderStudyItems}
          </div> */}
        </div>
        {(isAuth && (
          <Button
            className={styles.btn}
            variant="outlineGreen"
            onClick={() => dispatch(openTariffsModal({}))}
          >
            Обновить подписку
          </Button>
        )) || (
          <Button className={styles.btn} variant="outlineGreen" onClick={signInRouteHandler}>
            Войти
          </Button>
        )}
      </div>
    </Drawer>
  );
};

export default Sidebar;
