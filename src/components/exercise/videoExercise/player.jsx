import React, { useRef, useEffect } from 'react';
import Plyr from 'plyr-react';


export const VideoPlayer = ({ sourceData }) => {
  const ref = useRef();
  console.log(sourceData);
  return (
    <>

      <Plyr source={sourceData} />
    </>
  );
};
