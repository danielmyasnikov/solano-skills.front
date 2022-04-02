import { Link } from 'react-router-dom';

import { socialItems } from './constants.js';

import GoogleSvg from '@assets/settings/google';
import VkontakteSvg from '@assets/settings/vk';

import styles from './styles.module.less';
import { Button } from '@mui/material';

const Social = () => {
  const renderSvg = (title) => {
    switch (title) {
      case 'Вконтакте':
        return <VkontakteSvg />;
      case 'Google':
        return <GoogleSvg />;
      default:
        return;
    }
  };
  return (
    <div className={styles.social}>
      <div className={styles.title}>Социальные сети</div>
      <div className={styles.wrap}>
        <span className={styles.preTitle}>Ваши аккаунты:</span>
        <div className={styles.container}>
          {socialItems.map((item, i) => (
            <div className={styles.item} key={i}>
              <div className={styles.itemWrapper}>
                {renderSvg(item.title)}
                <div className={styles.content}>
                  <span className={styles.bold}>{item.title}</span>
                  <Link to={item.link}>{item.link}</Link>
                </div>
              </div>
              <Button disabled={item.isLinked} variant="outlinePurple">
                Привязать
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Social;
