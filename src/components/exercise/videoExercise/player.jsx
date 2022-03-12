import React, { useRef, useEffect, memo, useState } from 'react';
import { sendAnswer } from '@store/exercise/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectExercise } from '@store/exercise/selector';
import Plyr from 'plyr-react';

export const VideoPlayer = memo(({ isAuth, nextLesson, sourceData, headers }) => {
  const [xpWasSent, setXpWasSent] = useState(false);

  const ref = useRef();

  const exercise = useSelector(selectExercise);
  const dispatch = useDispatch();

  const timeHandler = () => {
    if (isAuth) {
      dispatch(sendAnswer(exercise.slug, exercise.course_slug, exercise.xp, headers));
      setXpWasSent(true);
    }
  };

  const timeInterval = setInterval(() => intervalAction(), 1000);

  const intervalAction = () => {
    if (ref && ref.current !== null && !xpWasSent) {
      const plyrData = ref.current.plyr;
      const currentTime = Math.floor(plyrData.currentTime);
      const duration = Math.floor(plyrData.duration);
      const percentFromDuration = Math.floor(Math.floor(duration) / 10);
      if (currentTime >= Math.floor(duration - percentFromDuration)) {
        clearInterval(timeInterval);
        timeHandler();
      }
    } else {
      clearInterval(timeInterval);
    }
  };

  useEffect(() => {
    if (nextLesson) {
      clearInterval(timeInterval);
    }
  }, [nextLesson, timeInterval]);

  return <Plyr ref={ref} source={sourceData} />;
});
