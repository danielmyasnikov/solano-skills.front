import React from 'react';
import { v4 as uuid } from 'uuid';

import cn from 'classnames';
import AvatarDefault from '@assets/avatarDefault.png';
import Dataset from '@assets/Dataset';
import styles from './styles.module.less';

export const CourseSidebar = ({ tracks, datasets, coauthors }) => (
  <div className={styles.wrapper}>
    {Object.keys(tracks || []).length > 0 && (
      <div className={cn(styles.courseTrackWrapper, styles.card)}>
        <span className={styles.description}>Этот курс является частью следующих треков:</span>
        <ul className={styles.courseTracks}>
          {tracks.map((item) => (
            <li key={uuid()} className={styles.courseTrack}>
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
          {datasets.map((item) => (
            <li key={uuid()} className={styles.collaborator}>
              <img className={styles.image} src={AvatarDefault} alt="" />
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
          {datasets.map((item) => (
            <li key={uuid()} className={styles.dataset}>
              <Dataset />
              <span className={styles.name}>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
