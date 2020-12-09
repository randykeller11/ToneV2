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
  const [padsRecMode, setPadsRecMode] = useState(0);
  const [recModeState, setRecModeState] = useState(0);
  const [metronome, setMetronome] = useState(null);

  const contextValue = {
    players,
    snapMode,
    setCurrentTrack,
    currentTrack,
    activeDispatch,
    isActiveArray,
    recState,
    recDispatch,
    setPadsRecMode,
    padsRecMode,
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

  //just for initiating if not playing for right now!!!
  const recordModeLogic = () => {
    //schedule a restart a 0 after four bars of metronome
    Tone.Transport.scheduleOnce(() => {
      setRecModeState(1);
      Tone.Transport.position = "0:0:0";
    }, "1:0:0");
    //console log the time
    Tone.Transport.scheduleRepeat(() => {
      console.log(Tone.Transport.position);
    }, "16n");
    //start transport
    Tone.Transport.start("+0.1", 0);
  };

  //start of not playing recording logic

  useEffect(() => {
    if (recModeState === 1) {
      if (!clickMode) {
        metronome.mute = true;
      }
      setPadsRecMode(1);
      console.log("put recording logic here");
      Tone.Transport.scheduleOnce(() => {
        setRecModeState(2);
      }, "4:0:0");
    }
  }, [recModeState]);

  //end of recording logic

  useEffect(() => {
    if (recModeState === 2) {
      setPadsRecMode(2);
      console.log("put end of recording logic here");
      Tone.Transport.stop();
      Tone.Transport.position = "0:0:0";
      Tone.Transport.start("+.01");
    }
  }, [recModeState]);

  useEffect(() => {
    if (isRecording) {
      if (recModeState === 0) {
        constructMet();
      }
      recordModeLogic();
    }
  }, [isRecording]);

  if (presetMode === 0) {
    return (
      <div className="presetBank">
        <presetBankData.Provider value={contextValue}>
          <PlayPads />
          <TrackToggle />
        </presetBankData.Provider>
      </div>
    );
  } else return <h1>wait on it</h1>;
}

export default PresetBank0;
