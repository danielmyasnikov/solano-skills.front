import { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@components/mui/button';

import { VideoPlayer } from './Player';

import styles from './styles.module.less';
import { selectRootExercise, selectSignupModal } from '@src/features/exercises/store/selectors';
import Box from '@mui/material/Box';
import RegistrationModal from '@components/common/modals/registration/registrationModal';
import { exercisesSlice } from '@src/features/exercises/store/slices/exercises.slice';

const VideoExercise = ({ goNext }) => {
  const dispatch = useDispatch();
  const transcriptRef = useRef();
  const signupModal = useSelector(selectSignupModal);

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
      {signupModal && (
        <RegistrationModal
          isOpenFromExercises
          onClose={() => dispatch(exercisesSlice.actions.closeSignupModal({}))}
        />
      )}
    </Box>
  );
};

export default VideoExercise;
