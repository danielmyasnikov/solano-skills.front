import { instructorList } from './constants';
import { Instructor } from './instructor';
import styles from './styles.module.less';
import Helmet from 'react-helmet';

export const Instructors = () => {
  return (
    <div className={styles.wrapper}>
      <Helmet title="Преподаватели" />
      <div className={styles.header}>
        <h1 className={styles.title}>Дипломы преподавателей</h1>
        <p className={styles.description}>Здесь вы можете посмотреть квалификацию наших лекторов</p>
      </div>
      <div className={styles.content}>
        {instructorList.map(({ id, name, diplomaImgLink }) => (
          <Instructor key={id} id={id} name={name} url={diplomaImgLink} />
        ))}
      </div>
    </div>
  );
};
