import { useState } from 'react';

import Switch from '@components/mui/Switch';

import { notificationsItems } from './constants.js';

import styles from './styles.module.less';

export const SettingsNotifications = () => {
  const [onBoarding, setOnBoarding] = useState(false);
  const [info, setInfo] = useState(false);
  const [adviсe, setAdviсe] = useState(false);
  const [special, setSpecial] = useState(false);

  const setStateHandler = (title) => {
    switch (title) {
      case 'Онбординг':
        return onBoarding;
      case 'Информационные оповещения':
        return info;
      case 'Улучшение обучения':
        return adviсe;
      case 'Специальные предложения':
        return special;
      default:
        return;
    }
  };

  const handleСheckedChange = (checked, title) => {
    switch (title) {
      case 'Онбординг':
        setOnBoarding(checked);
        break;
      case 'Информационные оповещения':
        setInfo(checked);
        break;
      case 'Улучшение обучения':
        setAdviсe(checked);
        break;
      case 'Специальные предложения':
        setSpecial(checked);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.notifications}>
      <div className={styles.title}>Уведомления</div>
      <div className={styles.wrap}>
        <div className={styles.preTitle}>Я хочу получать электронные письма о:</div>
        <div>
          {notificationsItems.map(({ title, description, isActive }) => (
            <div className={styles.item}>
              <div className={styles.itemContent}>
                <span className={styles.preTitle}>{title}</span>
                <span className={styles.grey}>{description}</span>
              </div>
              <Switch
                checked={setStateHandler()}
                handleChange={(e) => handleСheckedChange(e.target.checked, title)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
