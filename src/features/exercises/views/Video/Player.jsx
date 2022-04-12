import { useRef, memo, useEffect } from 'react';

import Plyr from 'plyr-react';
import { useSelector } from 'react-redux';
import { selectRootExercise } from '@src/features/exercises/store/selectors/exercises.selectors';
import Box from '@mui/material/Box';
import Prev from '@assets/prev.png';
export const VideoPlayer = memo(() => {
  const ref = useRef(null);

  const exercise = useSelector(selectRootExercise);

  if (!exercise.video_id) {
    return null;
  }

  const sourceData = {
    type: 'video',
    poster: Prev,
    sources: [
      {
        provider: 'html5',
        src: exercise.video_id['360'],
        type: 'video/mp4',
        size: 360,
      },
      {
        provider: 'html5',
        src: exercise.video_id['540'],
        type: 'video/mp4',
        size: 576,
      },
      {
        provider: 'html5',
        src: exercise.video_id['720'],
        type: 'video/mp4',
        size: 720,
      },
      {
        provider: 'html5',
        src: exercise.video_id['1080'],
        type: 'video/mp4',
        size: 1080,
      },
    ],
  };

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
            storage: { enabled: true, key: 'videoPlayer' },
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
