import React, { useState, useContext, useEffect } from "react";
import * as Tone from "tone";
import "./PlayPad.css";
import { presetBankData } from "./PresetBank0";
import { playTargetPlayer, quantizeTransportPosition } from "./helperFunctions";

function PlayPad({ padIndex, padColor, localRecs, setLocalRecs }) {
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

  const localRecordLogic = () => {
    if (isRecording && snapMode) {
      if (localRecs.find((pad) => pad.padIndex === padIndex)) {
        const newArray = [...localRecs];
        const updatedArray = newArray.map((pad) => {
          if (pad.padIndex === padIndex) {
            let updatedPad = {
              ...pad,
              tStamps: [...pad.tStamps, quantizeTransportPosition(transportTime)],
            };
            return updatedPad;
          }
          return pad;
        });
        setLocalRecs(updatedArray);
      } else {
        const newArray = [
          ...localRecs,
          {
            padIndex: padIndex,
            tStamps: [transportTime],
          },
        ];
        setLocalRecs(newArray);
      }
    }
    if (isRecording && !snapMode) {
      if (localRecs.find((pad) => pad.padIndex === padIndex)) {
        const newArray = [...localRecs];
        const updatedArray = newArray.map((pad) => {
          if (pad.padIndex === padIndex) {
            let updatedPad = {
              ...pad,
              tStamps: [...pad.tStamps, transportTime],
            };
            return updatedPad;
          }
          return pad;
        });
        setLocalRecs(updatedArray);
      } else {
        const newArray = [
          ...localRecs,
          {
            padIndex: padIndex,
            tStamps: [transportTime],
          },
        ];
        setLocalRecs(newArray);
      }
    }
  };

  const downHandler = () => {
    localRecordLogic();

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
