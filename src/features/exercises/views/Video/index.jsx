import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { VideoPlayer } from './Player';

import styles from './styles.module.less';
import { selectRootExercise } from '@src/features/exercises/store/selectors/exercises.selectors';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { sendAnswer } from '@src/features/exercises/store/actions/exercises.actions';
import { getProfile } from '@store/profile/actions';
import { selectIsAuth } from '@store/profile/selector';

const VideoExercise = ({ goNext }) => {
  const transcriptRef = useRef();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

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
          <Button
            variant={'containedPurple'}
            onClick={() => {
              if (isAuth) {
                dispatch(
                  sendAnswer({
                    exerciseId: exercise.slug,
                    courseId: exercise?.course_slug,
                    xp: exercise.xp,
                  }),
                ).then(() => {
                  const uid = localStorage.getItem('uid');
                  const client = localStorage.getItem('client');
                  const accessToken = localStorage.getItem('access-token');

                  dispatch(
                    getProfile({
                      headers: {
                        uid,
                        client,
                        'access-token': accessToken,
                      },
                    }),
                  );
                });
              }

              goNext();
            }}
          >
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
