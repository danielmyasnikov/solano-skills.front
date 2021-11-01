import React, { useState, useEffect, useMemo } from 'react';
import { VideoPlayer } from './player';
import { useSelector } from 'react-redux';
import Button from '@components/mui/button';
import { selectExercise } from '@store/exercise/selector';

import styles from './styles.module.less';

export const VideoExercise = () => {
  const exercise = useSelector(selectExercise);

  // const [sourceData, setSourceData] = useState({});

  const sourceData = useMemo(
    () => ({
      type: 'video',
      sources: [
        {
          src: exercise.video_id['360'],
          type: 'video/mp4',
          size: 360,
        },
        {
          src: exercise.video_id['540'],
          type: 'video/mp4',
          size: 540,
        },
        {
          src: exercise.video_id['720'],
          type: 'video/mp4',
          size: 720,
        },
        {
          src: exercise.video_id['1080'],
          type: 'video/mp4',
          size: 1080,
        },
      ],
    }),
    [exercise],
  );

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{exercise.title}</h1>
      <p className={styles.description}>
        Вы получите<span className={styles.xp}> {` ${exercise.xp} xp`}</span>
      </p>
      <div className={styles.playerWrapper}>
        <VideoPlayer sourceData={sourceData} />
      </div>
      <div className={styles.btnWrapper}>
        <Button variant="outlinePurple">Показать стенограмму</Button>
        <Button variant={'containedPurple'}>Продолжить</Button>
      </div>
    </div>
  );
};
