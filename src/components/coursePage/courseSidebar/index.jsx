import React from 'react';
import cn from 'classnames';
import ProgressBar from '@components/mui/progressBar';
import styles from './styles.module.less';
import AvatarDefault from '@assets/avatarDefault.png';
import mentor from '@assets/mentor.png';
import Dataset from '@assets/Dataset';

export const CourseSidebar = ({ variant, tracks, datasets, coauthors, progress, mentors }) => {
  return (
    <div className={cn(styles.wrapper, styles[variant])}>
      {Object.keys(tracks || []).length > 0 && (
        <div className={cn(styles.courseTrackWrapper, styles.card)}>
          <span className={styles.description}>Этот курс является частью следующих треков:</span>
          <ul className={styles.courseTracks}>
            {tracks.map((item, i) => (
              <li key={item.title + i} className={styles.courseTrack}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {Object.keys(coauthors || []).length > 0 && (
        <div className={cn(styles.card, styles.collaboratorsWrapper)}>
          <span className={styles.title}>Совместно с:</span>
          <ul className={styles.datasets}>
            {datasets.map((item, i) => (
              <li key={item.title + i} className={styles.collaborator}>
                <img className={styles.image} src={AvatarDefault} />
                <span className={styles.name}>{`${item.first_name} ${item.last_name}`}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {Object.keys(datasets || []).length > 0 && (
        <div className={cn(styles.card, styles.datasetWrapper)}>
          <span className={styles.title}>Наборы данных</span>
          <ul className={styles.datasets}>
            {datasets.map((item, i) => (
              <li key={item.title + i} className={styles.dataset}>
                <Dataset />
                <span className={styles.name}>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {progress && (
        <div className={cn(styles.card, styles.progressWrapper)}>
          <div className={styles.progressWrapper__title}>Ваш прогресс</div>
          <ProgressBar
            value={progress}
            height={'12px'}
            variant={'skill'}
            top={'15px'}
            isShowValue={true}
          />
          <div className={styles.progressWrapper__stats}>
            <div className={styles.progressWrapper__stat}>1 пройден</div>
            <div className={styles.progressWrapper__stat}>1 в прогрессе</div>
            <div className={styles.progressWrapper__stat}>3 осталось</div>
          </div>
        </div>
      )}
      {mentors && (
        <div className={cn(styles.card, styles.mentorsWrapper)}>
          <div className={styles.mentorsWrapper__title}>Инструкторы: </div>
          <div className={styles.mentorsWrapper__mentors}>
            {mentors.map(name => (
              <div className={styles.mentorsWrapper__mentor}>
                <img src={mentor} alt="" />
                <div className={styles.mentorsWrapper__mentor__name}>
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
