import React, { useState, useReducer } from "react";
import PlayPads from "./PlayPads";
import useBank0Players from "./useBank0Players";
import "./PresetBank.css";
import TrackToggle from "./TrackToggle";
import { initialState, isActiveReducer } from "./isActiveReducer";
import { initialRecState, recordingsReducer } from "./recordingsReducer";

export const presetBankData = React.createContext();

function PresetBank0({ snapMode, isRecording }) {
  const [isActiveArray, activeDispatch] = useReducer(isActiveReducer, initialState);
  const [recState, recDispatch] = useReducer(recordingsReducer, initialRecState);
  const [players, loading] = useBank0Players();
  const [currentTrack, setCurrentTrack] = useState(0);
  const [presetMode, setPresetMode] = useState(0);

  const contextValue = {
    players,
    snapMode,
    isRecording,
    setCurrentTrack,
    currentTrack,
    activeDispatch,
    isActiveArray,
    recState,
    recDispatch,
  };

  if (presetMode === 0) {
    return (
      <div className="presetBank">
        <presetBankData.Provider value={contextValue}>
          <PlayPads currentTrack={currentTrack} />
          <TrackToggle />
        </presetBankData.Provider>
      </div>
    );
  } else return <h1>wait on it</h1>;
}

export default PresetBank0;
