import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import Logo from '@assets/bigLogo.svg';
import LogoMobile from '@assets/LogoMobile.svg';

export const AuthContainer = ({ children }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.wrapper}>
      {width >= 850 && (
        <div className={styles.logoContainer}>
          <img src={Logo} alt="Логотип компании" className={styles.logo} />
        </div>
      )}
      <div className={styles.container}>
        {width < 850 && (
          <img src={LogoMobile} alt="Логотип компании" className={styles.logoMobile} />
        )}
        <div className={styles.content}> {children}</div>
      </div>
    </div>
  );
};
