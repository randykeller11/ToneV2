import React, { useState } from "react";
import PlayPads from "./PlayPads";
import useBank0Players from "./useBank0Players";
import "./PresetBank.css";

export const presetBankData = React.createContext();

function PresetBank0({ snapMode, isRecording }) {
  const [players, loading] = useBank0Players();
  const [currentTrack, setCurrentTrack] = useState(0);
  const [presetMode, setPresetMode] = useState(0);

  const contextValue = {
    players,
    snapMode,
    isRecording,
  };

  if (presetMode === 0) {
    return (
      <div className="presetBank">
        <presetBankData.Provider value={contextValue}>
          <PlayPads currentTrack={currentTrack} />
        </presetBankData.Provider>
        <div className="trackTogglers">
          <div
            className="trackToggler_button"
            onClick={() => setCurrentTrack(0)}
            style={{backgroundColor: "#5DADEC"}}
          ></div>
          <div
            className="trackToggler_button"
            onClick={() => setCurrentTrack(1)}
            style={{backgroundColor: "#FF8866"}}
          ></div>
          <div
            className="trackToggler_button"
            onClick={() => setCurrentTrack(2)}
            style={{backgroundColor: "#BEE64B"}}
          ></div>
          <div
            className="trackToggler_button"
            onClick={() => setCurrentTrack(3)}
            style={{backgroundColor: "#9400D3"}}
          ></div>
        </div>
      </div>
    );
  } else return <h1>wait on it</h1>;
}

export default PresetBank0;
