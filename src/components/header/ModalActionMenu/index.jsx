import { Link } from 'react-router-dom';

import User from '@assets/icon/user.svg';
import Settings from '@assets/icon/settings.svg';
import Support from '@assets/icon/support.svg';
import Exit from '@assets/icon/exit.svg';

import styles from './styles.module.less';

export const ModalActionMenu = ({ totalXP }) => {
  const item = (img, text, link) => {
    const clickHandler = () => {
      if (link === 'sing-in') {
        localStorage.clear();
      }
    };

    return (
      <Link onClick={clickHandler} className={styles.menuLink} to={`/${link}`}>
        <img src={img} alt="" />
        <span>{text}</span>
      </Link>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperXP}>{totalXP} XP</div>
      {item(User, 'Перейти в профиль', 'profile')}
      {item(Settings, 'Настройки аккаунта', '')}
      {item(Support, 'Поддержка', '')}
      {item(Exit, 'Выйти', 'sing-in')}
    </div>
  );
};
