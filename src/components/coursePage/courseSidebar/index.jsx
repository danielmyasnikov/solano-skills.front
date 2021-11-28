import React from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import AvatarDefault from '@assets/avatarDefault.png';
import Dataset from '@assets/Dataset';

export const CourseSidebar = ({ tracks, datasets, coauthors }) => {
  return (
    <div className={styles.wrapper}>
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
    </div>
  );
};
