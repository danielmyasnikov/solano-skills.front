import styles from './styles.module.less';
import Rustam from '../diplomasImg/rustamPrev.png';

export const Instructor = ({ id, name, url }) => {
  const getPrevImg = () => {
    switch (id) {
      case 1:
        return Rustam;
      default:
        return;
    }
  };

  return (
    <div className={styles.wrapper}>
      <span>{name}</span>
      <a className={styles.instructor} href={url} target="_blank" rel="noreferrer">
        <img src={getPrevImg()} alt="diploma" />
      </a>
    </div>
  );
};
