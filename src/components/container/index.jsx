import React, { createRef, useEffect, useState } from 'react';
import styles from './styles.module.less';
import Header from '@components/header';
import HeaderExercise from '@components/headerExercise';
import { useRouteMatch } from 'react-router-dom';
import { sidebarPath } from '../../sidebarPath';
import Sidebar from '@components/mui/sidebar';

const Container = ({ Component, headerVariant }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarFixed, setSidebarFixed] = useState(false);
  const match = useRouteMatch();
  const headerRef = createRef();

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  useEffect(() => {
    if (sidebarPath.includes(match.path)) {
      setSidebarFixed(true);
    } else {
      setSidebarFixed(false);
    }
  }, [match.path]);

  return (
    <div className={styles.wrapper}>
      {headerVariant === 'exercise' ? (
        <HeaderExercise headerRef={headerRef} handleSidebar={handleSidebar} />
      ) : (
        <Header headerRef={headerRef} handleSidebar={handleSidebar} />
      )}
      <div className={styles.container}>
        <Sidebar
          closeSidebar={closeSidebar}
          openSidebar={openSidebar}
          headerTarget={headerRef}
          isSidebarOpen={isSidebarOpen}
          sidebarFixed={sidebarFixed}
        />
        <Component />
      </div>
    </div>
  );
};

export default Container;
