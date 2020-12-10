import React, { useEffect, useState, useContext } from "react";
import PlayPad from "./PlayPad";
import usePlayPadColors from "./usePlayPadColors";
import { sortPadColorMap } from "./helperFunctions";
import "./PlayPads.css";
import { presetBankData } from "./PresetBank0";

function PlayPads() {
  const { currentTrack, recState, recDispatch, padsRecMode, setPadsRecMode } = useContext(presetBankData);
  //---------------------------------logic for CSS 👇🏾👇🏾👇🏾👇🏾👇🏾-----------------------------------------
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

  //------------------------------------logic for recording 👇🏾👇🏾👇🏾👇🏾-----------------------------------------
  const [localRecs, setLocalRecs] = useState([]);

  useEffect(() => {
    if (colorsSorted) {
      const localTarget = colorMap[currentTrack].map((padRow, colIndex) => (
        <div className="donut__padRow">
          {padRow.map((colorValue, rowIndex) => (
            <PlayPad
              padColor={trackColors[currentTrack][colorValue]}
              padIndex={calcPadIndex(rowIndex, colIndex)}
              localRecs={localRecs}
              setLocalRecs={setLocalRecs}
            />
          ))}
        </div>
      ));

      setTargetRender(localTarget);
    }
  }, [colorsSorted, currentTrack, localRecs]);


  useEffect(()=>{
    const recording = {newRec: {
      track: currentTrack,
      recs: localRecs,}
    }

    if(padsRecMode === 2){
      console.log('time to run my clean up function!');
      recDispatch({type: 'add', payload: recording});
      setLocalRecs([]);
    }
  },[padsRecMode]);

  return (
    <div className="playPads">
      {targetRender ? targetRender : <h1>loading</h1>}
    </div>
  );
}

export default PlayPads;
