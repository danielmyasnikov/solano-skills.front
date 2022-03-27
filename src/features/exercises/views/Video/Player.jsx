import { useRef, memo } from 'react';

import Plyr from 'plyr-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '@store/profile/selector';
import { selectRootExercise } from '@src/features/exercises/store/selectors';
import Box from '@mui/material/Box';
import { sendAnswer } from '@src/features/exercises/store/actions';

export const VideoPlayer = memo(() => {
  const ref = useRef();

  const dispatch = useDispatch();

  const exercise = useSelector(selectRootExercise);
  const isAuth = useSelector(selectIsAuth);

  if (!exercise.video_id) {
    return null;
  }

  const sourceData = {
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
  };

  const timeInterval = setInterval(() => {
    if (ref.current) {
      const plyrData = ref.current.plyr;
      const currentTime = Math.floor(plyrData.currentTime);
      const duration = Math.floor(plyrData.duration);
      const percentFromDuration = Math.floor(Math.floor(duration) / 10);
      if (currentTime >= Math.floor(duration - percentFromDuration)) {
        clearInterval(timeInterval);
        if (isAuth) {
          dispatch(
            sendAnswer({
              exerciseId: exercise.slug,
              courseId: exercise?.course_slug,
              xp: exercise.xp,
            }),
          );
        }
      }
    }
  }, 1000);

  return (
    <>
      <Box style={{ position: 'absolute' }}>
        <Plyr
          ref={ref}
          source={sourceData}
          options={{
            quality: {
              default: localStorage.getItem('plyr')?.quality || 1080,
            },
            speed: {
              default: localStorage.getItem('plyr')?.speed || 1,
              selected: localStorage.getItem('plyr')?.speed || 1,
            },
          }}
        />
      </Box>

      <Box
        className="plyr plyr--full-ui plyr--video plyr--html5 plyr--paused plyr--stopped plyr--pip-supported plyr--fullscreen-enabled"
        sx={{
          zIndex: -1,
          overflow: 'hidden',
        }}
      >
        <Box className="plyr__video-wrapper">
          <video />
        </Box>
      </Box>
    </>
  );
});
