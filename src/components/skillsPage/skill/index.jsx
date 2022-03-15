import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '@components/mui/progressBar';
import { Time } from '@assets/Time';
import { CoursesDark } from '@assets/CoursesDark';
import styles from './styles.module.less';
import skillLogo from '@assets/skill.png';

const Skill = ({ title, description, info }) => {
  return (
    <div className={styles.skill}>
      <div className={styles.main}>
        <div className={styles.logo}>
          <img src={skillLogo} alt={'навык'} />
        </div>
        <div className={styles.title}>
          <div>{title}</div>
        </div>
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
          <Link to={'/skills/1'}>Продолжить</Link>
        ) : (
          <Link to={'/skills/1'}>Начать</Link>
        )}
      </div>
    </div>
  );
};

export default Skill;
