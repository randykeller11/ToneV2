import React, { useState, useReducer } from "react";
import PlayPads from "./PlayPads";
import useBank0Players from "./useBank0Players";
import "./PresetBank.css";
import TrackToggle from './TrackToggle';
import {initialState, isActiveReducer} from './isActiveReducer';

export const presetBankData = React.createContext();





function PresetBank0({ snapMode, isRecording }) {
  const [isActiveArray, dispatch] = useReducer(isActiveReducer, initialState);
  const [players, loading] = useBank0Players();
  const [currentTrack, setCurrentTrack] = useState(0);
  const [presetMode, setPresetMode] = useState(0);

  const contextValue = {
    players,
    snapMode,
    isRecording,
    setCurrentTrack,
    currentTrack,
    dispatch,
    isActiveArray,
  };

  if (presetMode === 0) {
    return (
      <div className="presetBank">
        <presetBankData.Provider value={contextValue}>
          <PlayPads currentTrack={currentTrack} />
          <TrackToggle/>
        </presetBankData.Provider>


      </div>
    );
  } else return <h1>wait on it</h1>;
}

export default PresetBank0;
