import { settingsMenuContent } from './constants.js';

import SubscriptionSvg from '@assets/settings/subscription';
import PasswordSvg from '@assets/settings/password';
import NotificationSvg from '@assets/settings/notification';
import SocialSvg from '@assets/settings/social';
import DeleteSvg from '@assets/settings/delete';

import cn from 'classnames';

import styles from './styles.module.less';

const SettingsMenu = ({ active, handleChange }) => {
  const renderSvg = (svg) => {
    switch (svg) {
      case 'subscription':
        return <SubscriptionSvg />;
      case 'password':
        return <PasswordSvg />;
      case 'notification':
        return <NotificationSvg />;
      case 'social':
        return <SocialSvg />;
      case 'delete':
        return <DeleteSvg />;
      default:
        return;
    }
  };
  return (
    <div className={styles.menu}>
      <div className={styles.wrap}>
        {settingsMenuContent.map((item, i) => (
          <div
            onClick={() => handleChange(item.svg)}
            key={i}
            className={cn(
              styles.item,
              { [styles.active]: item.svg === active },
              { [styles.delete]: item.svg === 'delete' },
              { [styles.deleteActive]: item.svg === 'delete' && item.svg === active },
            )}
          >
            {renderSvg(item.svg)}
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsMenu;
