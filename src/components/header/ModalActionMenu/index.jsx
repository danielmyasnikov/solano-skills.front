import { Link } from 'react-router-dom';
import cn from 'classnames';

import User from '@assets/icon/user.svg';
import Settings from '@assets/icon/settings.svg';
import Support from '@assets/icon/support.svg';
import Exit from '@assets/icon/exit.svg';

import styles from './styles.module.less';
import { Fragment } from 'react';

export const ModalActionMenu = ({ totalXP }) => {
  const item = (img, text, link) => {
    const clickHandler = () => {
      if (link === 'sign-in') {
        localStorage.clear();
      }
    };

    return (
      <Link
        onClick={clickHandler}
        className={cn(styles.menuLink, {
          [styles.disabled]: text === 'Настройки аккаунта' || text === 'Поддержка',
        })}
        to={`/${link}`}
      >
        <img src={img} alt="картинка" />
        <span>{text}</span>
      </Link>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperXP}>{totalXP} XP</div>
      {item(User, 'Перейти в профиль', 'profile')}
      {item(Settings, 'Настройки аккаунта', 'settings')}
      {item(Support, 'Поддержка', '')}
      {item(Exit, 'Выйти', 'sign-in')}
    </div>
  );
};
