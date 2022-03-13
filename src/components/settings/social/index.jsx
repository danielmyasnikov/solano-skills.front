import styles from './styles.module.less';
import { socialItems } from '../../constants';
import GoogleSvg from '@assets/settings/google';
import VkontakteSvg from '@assets/settings/vk';
import { Link } from 'react-router-dom';
import Button from '@components/mui/button';

const Social = () => {
  const renderSvg = (title) => {
    switch (title) {
      case 'Вконтакте':
        return <GoogleSvg />;
      case 'Google':
        return <VkontakteSvg />;
      default: return;
    }
  };
  return (
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
  );
};

export default Social;
