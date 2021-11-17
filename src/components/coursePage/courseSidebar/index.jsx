import React from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import AvatarDefault from '@assets/avatarDefault.png';
import Dataset from '@assets/Dataset';

export const CourseSidebar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.courseTrackWrapper, styles.card)}>
        <span className={styles.description}>Этот курс является частью следующих треков:</span>
        <ul className={styles.courseTracks}>
          <li className={styles.courseTrack}>Специалист по данным с Python</li>
          <li className={styles.courseTrack}>Специалист по данным с Python</li>
        </ul>
      </div>
      <div className={cn(styles.card, styles.collaboratorsWrapper)}>
        <span className={styles.title}>Совместно с:</span>
        <ul className={styles.collaborators}>
          <li className={styles.collaborator}>
            <img className={styles.image} src={AvatarDefault} />
            <span className={styles.name}>Александров Александр Александрович</span>
          </li>
          <li className={styles.collaborator}>
            <img className={styles.image} src={AvatarDefault} />
            <span className={styles.name}>Ширшов Олег Игоревич</span>
          </li>
        </ul>
      </div>
      <div className={cn(styles.card, styles.datasetWrapper)}>
        <span className={styles.title}>Наборы данных</span>
        <ul className={styles.datasets}>
          <li className={styles.dataset}>
            <Dataset />
            <span className={styles.name}>MLB (baseball)</span>
          </li>
          <li className={styles.dataset}>
            <Dataset />
            <span className={styles.name}>FIFA (soccer)</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
