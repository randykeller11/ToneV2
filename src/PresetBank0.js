import React, { useState, useReducer, useEffect } from "react";
import * as Tone from "tone";
import PlayPads from "./PlayPads";
import useBank0Players from "./useBank0Players";
import "./PresetBank.css";
import TrackToggle from "./TrackToggle";
import { initialState, isActiveReducer } from "./isActiveReducer";
import { initialRecState, recordingsReducer } from "./recordingsReducer";

export const presetBankData = React.createContext();

function PresetBank0({ snapMode, isRecording, isPlaying, clickMode }) {
  const [isActiveArray, activeDispatch] = useReducer(
    isActiveReducer,
    initialState
  );
  const [recState, recDispatch] = useReducer(
    recordingsReducer,
    initialRecState
  );
  const [players, loading] = useBank0Players();
  const [currentTrack, setCurrentTrack] = useState(0);
  const [presetMode, setPresetMode] = useState(0);
  const [padsRecording, setPadsRecording] = useState(false);
  const [recModeState, setRecModeState] = useState(0);
  const [metronome, setMetronome] = useState(null);

  const contextValue = {
    players,
    snapMode,
    padsRecording,
    setCurrentTrack,
    currentTrack,
    activeDispatch,
    isActiveArray,
    recState,
    recDispatch,
  };

  const constructMet = () => {
    const _metronome = new Tone.Part(
      (time) => {
        players[4].start();
      },
      [[0]]
    );
    _metronome.start(0);
    _metronome.loopEnd = "1:0:0";
    _metronome.loop = true;
    setMetronome(_metronome);
  };

  const recordModeLogic = () => {

    constructMet();
    Tone.Transport.scheduleOnce(() => {
      setRecModeState(1);
      Tone.Transport.position = "0:0:0";
    }, "1:0:0");
    Tone.Transport.scheduleRepeat(()=>{
      console.log(Tone.Transport.position);
    }, "16n");

    Tone.Transport.start("+0.1", 0);
  };

  useEffect(()=>{
    if(recModeState === 1){
      console.log('put recording logic here');
    }
  },[recModeState])

  useEffect(() => {
    if (isRecording) {
      recordModeLogic();
    }
  }, [isRecording]);

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
