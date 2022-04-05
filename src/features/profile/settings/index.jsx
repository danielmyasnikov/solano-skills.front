import SettingsMenu from './settingsMenu';
import styles from './styles.module.less';
import { useRef, useState } from 'react';
import ChangePassword from './changePassword';
import Social from './social';
import { SettingsNotifications } from './settingsNotifications';
import { SettingsDeleteAccount } from './settingsDeleteAccount';
import HeaderPage from '@components/common/HeaderPage';
import { Tariffs } from '@components/modals/TariffsModal/Tariffs';
import { useGetTariffsQuery } from '@src/features/payment/store/tariffs.api';

const Settings = () => {
  const [active, setActive] = useState('subscription');

  const { data: tariffs, isLoading } = useGetTariffsQuery();

  const subscriptionRef = useRef(null);
  const deleteAccountRef = useRef(null);
  // const notificationRef = useRef(null);
  const passwordRef = useRef(null);
  // const socialRef = useRef(null);

  const handleActiveMenu = (value) => {
    setActive(value);
    switch (value) {
      // case 'notification':
      //  notificationRef.current?.scrollIntoView({ behavior: 'smooth' });
      //  break;
      case 'delete': {
        deleteAccountRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'password': {
        passwordRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      // case 'social': {
      //   socialRef.current?.scrollIntoView({ behavior: 'smooth' });
      //   break;
      // }
      case 'subscription': {
        subscriptionRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      default:
        break;
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <HeaderPage content="settings" />
      <div className={styles.container}>
        <div className={styles.setings}>
          <SettingsMenu active={active} handleChange={handleActiveMenu} />
        </div>
        <div className={styles.content}>
          <div ref={subscriptionRef} className={styles.password}>
            <Tariffs tariffList={tariffs} />
          </div>

          <div ref={passwordRef}>
            <ChangePassword />
          </div>

          {/*
           <div ref={notificationRef}>
            <SettingsNotifications />
          </div>
           */}

          {/*
           <div ref={socialRef}>
            <Social />
          </div>
          */}

          <div ref={deleteAccountRef}>
            <SettingsDeleteAccount />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
