import React, { useState, useEffect, useMemo, useRef } from 'react';
import { VideoPlayer } from './player';
import { useSelector } from 'react-redux';
import Button from '@components/mui/button';
import { selectExercise } from '@store/exercise/selector';

import styles from './styles.module.less';

export const VideoExercise = ({ onSubmit }) => {
  const exercise = useSelector(selectExercise);
  const transcriptRef = useRef();
  const [showTranscript, setShowTranscript] = useState(false);

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
          size: 576,
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

  useEffect(() => {
    transcriptRef.current?.scrollIntoView();
  }, [showTranscript])

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>{exercise.title}</h1>
        <p className={styles.description}>
          Вы получите<span className={styles.xp}> {` ${exercise.xp} xp`}</span>
        </p>
        <div className={styles.playerWrapper}>
          <VideoPlayer sourceData={sourceData} />
        </div>
        <div className={styles.btnWrapper}>
          <Button variant="outlinePurple" onClick={() => {setShowTranscript(!showTranscript)}}>
            {!showTranscript ? 'Показать стенограмму' : 'Скрыть'}
          </Button>
          <Button variant={'containedPurple'} onClick={onSubmit}>
            Продолжить
          </Button>
        </div>
      </div>
      {showTranscript && <div ref={transcriptRef} className={styles.transcript}>{exercise.transcript}</div>}
    </div>
  );
};
