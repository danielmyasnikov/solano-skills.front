import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { VideoPlayer } from './Player';

import styles from './styles.module.less';
import { selectRootExercise } from '@src/features/exercises/store/selectors';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

const VideoExercise = ({ goNext }) => {
  const transcriptRef = useRef();

  const [showTranscript, setShowTranscript] = useState(false);

  const exercise = useSelector(selectRootExercise);

  useEffect(() => {
    transcriptRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [showTranscript]);

  return (
    <Box>
      <div className={styles.content}>
        <h1 className={styles.title}>{exercise.title}</h1>
        <p className={styles.description}>
          Вы получите<span className={styles.xp}> {` ${exercise.xp} xp`}</span>
        </p>
        <div className={styles.playerWrapper}>
          <VideoPlayer />
        </div>
        <div className={styles.btnWrapper}>
          <Button
            variant="outlinePurple"
            onClick={() => {
              setShowTranscript(!showTranscript);
            }}
          >
            {!showTranscript ? 'Показать стенограмму' : 'Скрыть'}
          </Button>
          <Button variant={'containedPurple'} onClick={goNext}>
            Продолжить
          </Button>
        </div>
      </div>
      {showTranscript && (
        <div ref={transcriptRef} className={styles.transcript}>
          {exercise.transcript}
        </div>
      )}
    </Box>
  );
};

export default VideoExercise;
