import React, { useState, useContext, useEffect } from "react";
import * as Tone from "tone";
import "./PlayPad.css";
import { presetBankData } from "./PresetBank0";
import { playTargetPlayer, quantizeTransportPosition } from "./helperFunctions";

function PlayPad({ padColor, padIndex, localRecs, setLocalRecs }) {
  const {
    activeDispatch,
    currentTrack,
    isActiveArray,
    players,
    padsRecMode,
    snapMode,
  } = useContext(presetBankData);

  const isRecording = padsRecMode === 1 ? true : false;

  const [isActive, setisActive] = useState(false);

  const padLocation = { padIndex: padIndex, trackIndex: currentTrack };

  const inactiveStyle = {
    border: "2px solid darkgray",
    backgroundColor: padColor,
    opacity: "62%",
  };

  const activeStyle = {
    border: "4px solid dimgray",
    backgroundColor: padColor,
    opacity: "100%",
  };

  const activeTrackTarget = isActiveArray.find(
    (track) => track.trackIndex === currentTrack
  );

  const activePadTarget = activeTrackTarget.activeArray.find(
    (pad) => pad.key === padIndex
  );

  useEffect(() => {
    setisActive(activePadTarget.isActive);
  }, [activePadTarget]);

  const transportTime = Tone.Transport.position;

  const recModeLogic = (_currentLocalRecs, _time) => {
    // if (_currentLocalRecs.find((pad) => pad.padIndex === padIndex)) {
    //   console.log("i know theres alread a value");
    // } else {
    _currentLocalRecs.push({
      padIndex: padIndex,
      tStamps: [_time],
    });
    // console.log(_currentLocalRecs);
    return _currentLocalRecs;
  };
  const downHandler = () => {
    const currentLocalRecs = [...localRecs];
    console.log(currentLocalRecs);
    if (isRecording && snapMode) {
      setLocalRecs(
        recModeLogic(currentLocalRecs, quantizeTransportPosition(transportTime))
      );
      // console.log(newArray);
    }
    if (isRecording && !snapMode) {
      setLocalRecs(recModeLogic(currentLocalRecs, transportTime));
      // console.log(newArray);
    }

    activeDispatch({ type: "activate", payload: padLocation });
    playTargetPlayer(players[currentTrack][padIndex]);
  };
  const upHandler = () => {
    activeDispatch({ type: "deactivate", payload: padLocation });
  };

  return (
    <div
      className="playPad"
      style={isActive ? activeStyle : inactiveStyle}
      onMouseDown={downHandler}
      onMouseUp={upHandler}
      onMouseLeave={upHandler}
    ></div>
  );
}

export default PlayPad;
