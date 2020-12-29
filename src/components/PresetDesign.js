import React, { useState, useReducer, useEffect, useContext } from "react";
import * as Tone from "tone";
import PlayPads from "./playpadMode/PlayPads";
import "./PresetDesign.css";
import TrackToggle from "./TrackToggle";
import { initialState, isActiveReducer } from "../reducers/isActiveReducer";
// import {
//   initialRecState,
//   recordingsReducer,
// } from "../reducers/recordingsReducer";
import {
  initRecsBankState,
  recsBankReducer,
} from "../reducers/recsBankReducer";
import {
  initTargetRecState,
  targetRecsReducer,
} from "../reducers/targetRecsReducer";
import Sequencer from "./sequenceMode/Sequencer";
import { gameModeData } from "./GameMode";

//context function for data layer
export const presetBankData = React.createContext();

function PresetDesign({ players }) {
  const {
    snapMode,
    isRecording,
    isPlaying,
    clickMode,
    presetMode,
    setSeqModeBar,
    seqModeBar,
    setPresetMode,
  } = useContext(gameModeData);

  //reducer for active pad animations
  const [isActiveArray, activeDispatch] = useReducer(
    isActiveReducer,
    initialState
  );

  //reducer for recording functionality
  // const [recState, recDispatch] = useReducer(
  //   recordingsReducer,
  //   initialRecState
  // );

  const [targetRecState, targetRecDispatch] = useReducer(
    targetRecsReducer,
    initTargetRecState
  );

  const [recBanksState, recsBankDispatch] = useReducer(
    recsBankReducer,
    initRecsBankState
  );

  //state variables for presetBank functionality
  const [currentTrack, setCurrentTrack] = useState(0);
  const [padsRecMode, setPadsRecMode] = useState(0);
  const [recModeState, setRecModeState] = useState(0);
  const [metronome, setMetronome] = useState(null);
  const [activeRecs, setActiveRecs] = useState([]);

  //variables and functions for data layer
  const contextValue = {
    players,
    snapMode,
    setCurrentTrack,
    currentTrack,
    activeDispatch,
    isActiveArray,
    targetRecDispatch,
    targetRecState,
    recsBankDispatch,
    setPadsRecMode,
    padsRecMode,
    seqModeBar,
    setSeqModeBar,
  };

  //metronome constructor function creates a tone.part looped at 1 bar
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

  //record mode logic currently only for if transport is not playing already
  //(eventually add if statement for if playing)
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

  //first use effect for recording logic

  useEffect(() => {
    if (recModeState === 1) {
      if (!clickMode) {
        metronome.mute = true;
      }
      //start pads local recording
      setPadsRecMode(1);
      console.log("put recording logic here");
      //at the end of the loop start the clean up of recorded timestamps
      Tone.Transport.scheduleOnce(() => {
        setRecModeState(2);
      }, "4:0:0");
    }
  }, [recModeState]);

  //use effect for timestamp cleanup
  useEffect(() => {
    if (recModeState === 2) {
      //start local pads cleanup functionality
      setPadsRecMode(2);
      Tone.Transport.stop();
      Tone.Transport.position = "0:0:0";
      Tone.Transport.start("+.01");
      // console.log("put end of recording logic here");
    }
  }, [recModeState]);

  //eventual clean up function
  useEffect(() => {
    if (recModeState === 3) {
      //restart transport after update
      Tone.Transport.stop();
      Tone.Transport.position = "0:0:0";
      Tone.Transport.start("+.005");
      // //set presetMode to sequencer mode
      setPresetMode(3);
    }
  }, [recModeState]);

  //use effect for record functionality
  // constructs metronome the first time then just runs record function the seecond time
  useEffect(() => {
    if (isRecording) {
      if (recModeState === 0) {
        constructMet();
      }
      recordModeLogic();
    }
  }, [isRecording]);

  //useEffect to update active recordings

  const recPadAnimation = (_padLocation) => {
    activeDispatch({ type: "activate", payload: _padLocation });
    setTimeout(() => {
      activeDispatch({ type: "deactivate", payload: _padLocation });
    }, 500);
  };

  useEffect(() => {
    let localArray = [];
    targetRecState.forEach((track) => {
      if (track.targetRecIndex != null) {
        //find the corresponding rec bank object
        let targetTrackRecs = recBanksState.find(
          (trackRec) =>
            track.trackIndex === trackRec.track &&
            track.targetRecIndex === trackRec.recIndex
        );
        //make tone.parts out of the recordings value and push to local array
        targetTrackRecs.recordings.forEach((pad) => {
          console.log(pad.padIndex, pad.tStamps);
          localArray.push(
            new Tone.Part(
              (time) => {
                players[track.trackIndex][pad.padIndex].start();
                Tone.Draw.schedule(() => {
                  recPadAnimation({
                    padIndex: pad.padIndex,
                    trackIndex: track.trackIndex,
                  });
                }, time);
              },
              [pad.tStamps]
            )
          );
        });
      }
    });
    localArray.forEach((part) => {
      part.start(0);
      part.loopEnd = "4:0:0";
      part.loop = true;
    });
    setActiveRecs(localArray);
  }, [targetRecState, recBanksState]);

  //return statement currently only handles play mode
  if (presetMode === 1) {
    return (
      <div className="presetBank">
        <presetBankData.Provider value={contextValue}>
          <PlayPads />
          <TrackToggle />
        </presetBankData.Provider>
      </div>
    );
  } else if (presetMode === 3) {
    return (
      <presetBankData.Provider value={contextValue}>
        <Sequencer />
        <TrackToggle />
      </presetBankData.Provider>
    );
  } else return <h1>wait on it</h1>;
}

export default PresetDesign;
