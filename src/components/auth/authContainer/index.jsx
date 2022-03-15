import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import Logo from '@assets/bigLogo.png';
import LogoMobile from '@assets/LogoMobile.svg';

export const AuthContainer = ({ children }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setWidth]);

  return (
    <div className={styles.wrapper}>
      {width >= 850 && (
        <div className={styles.logoContainer}>
          <img src={Logo} alt="logo" className={styles.logo} />
        </div>
      )}
      <div className={styles.container}>
        {width < 850 && <img src={LogoMobile} alt="logo" className={styles.logoMobile} />}
        <div className={styles.content}> {children}</div>
      </div>
    </div>
  );
};
