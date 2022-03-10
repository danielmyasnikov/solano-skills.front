import HeaderPage from '../common/headerPage';
import SettingsMenu from './settingsMenu';
import styles from './styles.module.less';
import Button from '@components/mui/button';
import { CheckboxBtn } from '@components/mui/checkbox';
import Switch from '@components/mui/switch';
import { useRef, useState } from 'react';
import { notificationsItems } from '../constants';
import ChangePassword from './changePassword';
import Social from './social';

const Settings = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkedError, setCheckedError] = useState(false);
  const [active, setActive] = useState('subscription');
  const deleteAccountRef = useRef(null);
  const notificationRef = useRef(null);
  const passwordRef = useRef(null);
  const socialRef = useRef(null);
  const handleChange = () => {};
  const handleAreement = () => {
    setIsChecked(!isChecked);
    setCheckedError(false);
  };
  const deleteProfile = () => {
    if (isChecked) {
    } else {
      setCheckedError(true);
    }
  };
  const handleActiveMenu = (value) => {
    setActive(value);
    switch (value) {
      case 'notification':
        notificationRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'delete': {
        deleteAccountRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'password': {
        passwordRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'social': {
        socialRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      default:
        break;
    }
  };
  
  return (
    <div className={styles.wrapper}>
      <HeaderPage content="settings" />
      <div className={styles.container}>
        <SettingsMenu active={active} handleChange={handleActiveMenu} />
        <div className={styles.content}>
          <div ref={passwordRef} className={styles.password}>
            <div className={styles.title}>Изменить пароль</div>
            <div className={styles.wrap}>
              <ChangePassword />
            </div>
          </div>
          <div ref={notificationRef} className={styles.notifications}>
            <div className={styles.title}>Уведомления</div>
            <div className={styles.wrap}>
              <div className={styles.preTitle}>Я хочу получать электронные письма о:</div>
              <div className={styles}>
                {notificationsItems.map((item) => (
                  <div className={styles.item}>
                    <div className={styles.itemContent}>
                      <span className={styles.preTitle}>{item.title}</span>
                      <span className={styles.grey}>{item.description}</span>
                    </div>
                    <Switch checked={item.isActive} handleChange={handleChange} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div ref={socialRef} className={styles.social}>
            <div className={styles.title}>Социальные сети</div>
            <div className={styles.wrap}>
              <Social />
            </div>
          </div>
          <div ref={deleteAccountRef} className={styles.deleteAccount}>
            <div className={styles.title}>Удалить аккаунт</div>
            <div className={styles.wrap}>
              <span className={styles.grey}>
                Когда вы удаляете свою учетную запись, вы теряете доступ к службам учетной записи
                Front, и мы безвозвратно удаляем ваши личные данные. Вы можете отменить удаление в
                течение 14 дней.
              </span>
              <div className={styles.agreement}>
                <CheckboxBtn
                  error={!!checkedError}
                  value={isChecked}
                  handleChange={handleAreement}
                />
                <span className={styles.grey}>
                  Подтверждаю, что я хочу удалить свою учетную запись.
                </span>
              </div>
              <Button onClick={deleteProfile} variant="containedRed">
                Удалить аккаунт
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
