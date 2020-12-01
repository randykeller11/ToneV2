import React, { useEffect, useState, useContext } from "react";
import PlayPad from "./PlayPad";
import usePlayPadColors from "./usePlayPadColors";
import { sortPadColorMap } from "./helperFunctions";
import './PlayPads.css';


function PlayPads({currentTrack}) {

  const trackColors = [
    ["#4570E6", "#5DADEC", "#76D7EA"],
    ["#FD3A4A", "#FF8866", "#FF9980"],
    ["#FFFF66", "#BEE64B", "#3AA655"],
    ["#BA55D3", "#9400D3", "#9370DB"],
  ];

  const [trackMap0, loadingTrackMap0] = usePlayPadColors();
  const [trackMap1, loadingTrackMap1] = usePlayPadColors();
  const [trackMap2, loadingTrackMap2] = usePlayPadColors();
  const [trackMap3, loadingTrackMap3] = usePlayPadColors();

  const [colorMap, setColorMap] = useState(null);

  const [targetRender, setTargetRender] = useState(null);
  const [colorsLoaded, setColorsLoaded] = useState(false);
  const [colorsSorted, setColorsSorted] = useState(false);

  const checkColorsLoaded = () => {
    if (
      loadingTrackMap0 &&
      loadingTrackMap1 &&
      loadingTrackMap2 &&
      loadingTrackMap3
    ) {
      setColorsLoaded(true);
    }
  };

  useEffect(() => {
    checkColorsLoaded();
  }, [trackMap0, trackMap1, trackMap2, trackMap3]);

  useEffect(() => {
    if (colorsLoaded === true) {
      setColorMap([
        sortPadColorMap(trackMap0),
        sortPadColorMap(trackMap1),
        sortPadColorMap(trackMap2),
        sortPadColorMap(trackMap3),
      ]);
      setColorsSorted(true);
    }
  }, [colorsLoaded]);

  const calcPadIndex = (row, col) => {
    return row * 4 + col;
  };

  useEffect(() => {
    if (colorsSorted) {
      const localTarget = colorMap[currentTrack].map((padRow, colIndex) => (
        <div className="donut__padRow">
          {padRow.map((colorValue, rowIndex) => (
            <PlayPad
              padColor={
                trackColors[currentTrack][colorValue]
              }
              padIndex={calcPadIndex(rowIndex, colIndex)}
            />
          ))}
        </div>
      ));

      setTargetRender(localTarget);
    }
  }, [colorsSorted, currentTrack]);


  return <div className="playPads">{targetRender ? targetRender : <h1>loading</h1>}</div>;
}

export default PlayPads;
