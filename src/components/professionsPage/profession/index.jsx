import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '@components/mui/progressBar';
import { Time } from '@assets/Time';
import { CoursesDark } from '@assets/CoursesDark';
import styles from './styles.module.less';
import skillLogo from '@assets/skill.png';

const Profession = ({ title, description, info }) => {
  return (
    <div className={styles.profession}>
      <div className={styles.main}>
        <div className={styles.logo}>
          <img src={skillLogo} alt={skillLogo} />
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.footer}>
        {info.progress ? (
          <div className={styles.progress}>
            <ProgressBar
              value={info.progress}
              height={'16px'}
              variant={'skills'}
              top={'25px'}
              isShowValue={true}
            />
          </div>
        ) : (
          <div className={styles.info}>
            <div className={styles.info__item}>
              <Time />
              <div>{info.hours}</div>
            </div>
            <div className={styles.info__item}>
              <CoursesDark />
              <div>{info.courses}</div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.description}>
        <div className={styles.text}>{description}</div>
        {info.progress ? (
          <Link to={'/professions/1'}>Продолжить</Link>
        ) : (
          <Link to={'/professions/1'}>Начать</Link>
        )}
      </div>
    </div>
  );
};

export default Profession;
