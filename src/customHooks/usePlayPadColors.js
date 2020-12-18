import React, { useState, useEffect } from "react";

function usePlayPadColors() {


  const [trackMap, setTrackMap] = useState(null);
  const [loadingTrackMap, setLoadingTrackMap] = useState(true);

  const generateTrackMap = () => {
    let localColArray = [];
    for (var i = 0; i < 16; i++) {
      localColArray.push(Math.floor(Math.random() * 3));
      setTrackMap(localColArray);
    }
  };

  useEffect(() => {
    generateTrackMap();
  }, []);

//   useEffect(() => {
//     if (trackMap) {

//       setLoadingTrackMap(false);
//     }
//   }, [padColorMap]);

  return [trackMap, loadingTrackMap];
}

export default usePlayPadColors;
