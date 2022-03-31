import { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';

import User from '@assets/icon/user.svg';
import Settings from '@assets/icon/settings.svg';
import Support from '@assets/icon/support.svg';
import Exit from '@assets/icon/exit.svg';

import cn from 'classnames';

import styles from './styles.module.less';

export const ActionMenu = ({ totalXP, onSupport, onCloseMenu, onOutsideClick }) => {
  const ref = useRef();
  const [onClickOutside, setOnClickOutside] = useState(false);

  const item = (img, text, link) => {
    const clickHandler = () => {
      if (link === '/courses') {
        localStorage.clear();
        window.location.reload();
      }
    };

    const supportClickHandler = () => {
      onSupport();
      onCloseMenu();
    };

    return (
      <div className={styles.menuLink}>
        {(text !== 'Поддержка' && (
          <Link onClick={clickHandler} to={`${link}`}>
            <img src={img} alt="icon" />
            <span>{text}</span>
          </Link>
        )) || (
          <div
            onClick={() => {
              supportClickHandler();
            }}
          >
            <img src={img} alt="icon" />
            <span>{text}</span>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOnClickOutside(!onClickOutside);
        onOutsideClick();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles.wrapperXP}>{totalXP} XP</div>
      {item(User, 'Перейти в профиль', '/profile')}
      {item(Settings, 'Настройки аккаунта', '/settings')}
      {item(Support, 'Поддержка', '')}
      {item(Exit, 'Выйти', '/courses')}
    </div>
  );
};
