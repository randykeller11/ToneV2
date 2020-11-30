import React, { useEffect, useState, useContext } from "react";
import PlayerPad from "./PlayerPad";
import usePlayPadColors from "./usePlayPadColors";
import { sortPadColorMap } from "./helperFunctions";

function PlayPads({ currentTrack }) {
  const trackColors = [
    ["#4570E6", "#5DADEC", "#76D7EA"],
    ["#FD3A4A", "#FF8866", "#FF9980"],
    ["#FFFF66", "#BEE64B", "#3AA655"],
    ["#BA55D3", "#9400D3", "#4B0082"],
  ];

  const [trackMap0, loadingTrackMap0] = usePlayPadColors();
  const [trackMap1, loadingTrackMap1] = usePlayPadColors();
  const [trackMap2, loadingTrackMap2] = usePlayPadColors();
  const [trackMap3, loadingTrackMap3] = usePlayPadColors();

  const [colorMap, setColorMap] = useState(null);

  const [targetRender, setTargetRender] = useState(null);
  const [colorsLoaded, setColorsLoaded] = useState(false);

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
      setTargetRender(<h1>colors are loaded broski</h1>);
    }
  }, [colorsLoaded]);

  // const calcPadIndex = (row, col) => {
  //     return row * 4 + col;
  //   };

  // const makePlayPads = (_padColorMap) => {
  //     _padColorMap.map((playerRow, colIndex) => (
  //         <div className="donut__padRow">
  //           {playerRow.map((player, rowIndex) => (
  //             <PlayerPad
  //               padColor = {trackColors[calcPadIndex(rowIndex, colIndex)]}
  //               padIndex={calcPadIndex(rowIndex, colIndex)}
  //             />
  //           ))}
  //         </div>
  //       ));
  // }

  return <div>{targetRender ? targetRender : <h1>loading</h1>}</div>;
}

export default PlayPads;
