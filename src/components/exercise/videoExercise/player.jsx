import React, { useRef, useEffect, useCallback } from 'react';

import { sendXpByVideo } from '@store/exercise/actions';
import { useDispatch } from 'react-redux';
import Plyr from 'plyr-react';

export const VideoPlayer = ({ id, xp, sourceData }) => {
  const ref = useRef();

  const dispatch = useDispatch();

  const timeHandler = useCallback(() => dispatch(sendXpByVideo(id, xp)), [dispatch, id, xp]);

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
  }, [id, timeHandler, xp]);

  return <Plyr ref={ref} source={sourceData} />;
};
