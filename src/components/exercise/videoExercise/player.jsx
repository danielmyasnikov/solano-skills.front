import React, { useRef, useEffect, useCallback } from 'react';
import { sendAnswer } from '@store/exercise/actions';
import { useDispatch } from 'react-redux';
import Plyr from 'plyr-react';

export const VideoPlayer = ({ sourceData, headers, exercise }) => {
  const ref = useRef();

  const dispatch = useDispatch();

  console.log(exercise);

  const timeHandler = useCallback(
    () => dispatch(sendAnswer(exercise.slug, exercise.course_slug, exercise.xp, headers)),
    [dispatch, exercise.slug, exercise.course_slug, exercise.xp, headers],
  );

  useEffect(() => {
    if (ref && ref.current !== undefined) {
      const timeInterval = setInterval(() => {
        const plyrData = ref.current.plyr;
        const currentTime = Math.floor(plyrData.currentTime);
        const duration = Math.floor(plyrData.duration);
        const percentFromDuration = Math.floor(Math.floor(duration) / 10);

        if (currentTime >= Math.floor(duration - percentFromDuration)) {
          timeHandler();
          clearInterval(timeInterval);
        }
      }, 1000);
    }
  }, [exercise.id, timeHandler, exercise.xp]);

  return <Plyr ref={ref} source={sourceData} />;
};
