import React, { FC, useEffect, useState } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

TopBarProgress.config({
  barColors: {
    '0': '#67C080',
    '0.5': '#67C080',
    '1.0': '#67C080',
  },
  shadowBlur: 0,
});

const AppSwitch: FC = ({ children }) => {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState('');
  const location = useLocation();

  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc('');
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);

  return (
    <>
      {progress && <TopBarProgress />}
      <Switch>{children}</Switch>
    </>
  );
};

export default AppSwitch;
