import styles from './styles.module.less';
import Rustam from '../diplomasImg/rustam.jpg';
import Dusheva from '../diplomasImg/Dusheva.jpg';
import Altov from '../diplomasImg/altov.jpg';
import Shafieva from '../diplomasImg/shafieva.jpg';
import Magomedova from '../diplomasImg/magomedova.jpg';

export const Instructor = ({ id, name, url }) => {
  const getPrevImg = () => {
    switch (id) {
      case 1:
        return Rustam;
      case 2:
        return Dusheva;
      case 3:
        return Altov;
      case 4:
        return Shafieva;
      case 5:
        return Magomedova;
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
