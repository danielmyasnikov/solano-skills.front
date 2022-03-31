import { headerPageContent } from '../../constants';
import styles from './styles.module.less';

const HeaderPage = ({ content }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{headerPageContent[content].title}</h1>
      <p className={styles.description}>{headerPageContent[content].description}</p>
    </div>
  );
};

export default HeaderPage;
