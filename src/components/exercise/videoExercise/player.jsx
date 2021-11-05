import React, { useRef, useEffect } from 'react';
import Plyr from 'plyr-react';

export const VideoPlayer = ({ sourceData }) => {
  const ref = useRef();
  console.log(sourceData);
  return (
    <>
      <Plyr
        source={sourceData}
        // options={{
        //   quality: {
        //     default: 576,
        //     options: [4320, 2880, 2160, 1440, 1080, 720, 540, 480, 360, 240],
        //   },
        // }}
      />
    </>
  );
};
