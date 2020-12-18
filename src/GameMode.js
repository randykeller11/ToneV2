import React, { Suspense, useState, useEffect } from "react";
import useTransport from "./customHooks/useTransport";
import { LinearProgress, Stepper, Step } from "@material-ui/core/";
import { PlayArrow, Mic, Undo, MusicNote, Schedule } from "@material-ui/icons";
import useToggle from "./useToggle";
import "./GameMode.css";
import PresetBank0 from "./PresetBank0";

const Track0 = React.lazy(() => import("./PresetBank0"));

//export the outer context
export const gameModeData = React.createContext();

function GameMode() {
  //which presetBank the app is using and what mode it is in
  const [presetBank, setPresetBank] = useState(false);
  const [presetMode, setPresetMode] = useState(3);

  //transport state variables
  const [isRecording, toggleRecord] = useToggle();
  const [clickMode, toggleClickMode] = useToggle();
  const [snapMode, toggleSnapMode] = useToggle();

  //logic for transport buttons
  const [
    isPlaying,
    usePlayButton,
    bpm,
    handleBpmChange,
    quantizeTransportPosition,
  ] = useTransport();

  const [seqModeBar, setSeqModeBar] = useState(0);

  //context values
  const contextValue = {
    snapMode,
    isRecording,
    isPlaying,
    clickMode,
    presetMode,
    setSeqModeBar,
    seqModeBar,
  };

  return (
    <div className="mainGame">
      <div
        className="togglePreset"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h3> 🍩 Donut 5000</h3>
      </div>
      {/*-------------------Transport Buttons----------------------------*/}

      <div className="transportButtons">
        <div className="transportButtons__buttonBox">
          <div
            onClick={usePlayButton}
            className={
              isPlaying
                ? "transportButtons__buttonBox__circleActive"
                : "transportButtons__buttonBox__circleInactive"
            }
          >
            <PlayArrow id="transportIcon" fontSize="large" color="primary" />
          </div>
          <h5 id="buttonBox__description">Play</h5>
        </div>
        <div className="transportButtons__buttonBox">
          <div
            onClick={toggleRecord}
            className={
              isRecording
                ? "transportButtons__buttonBox__circleActive"
                : "transportButtons__buttonBox__circleInactive"
            }
          >
            <Mic id="transportIcon" fontSize="large" color="primary" />
          </div>
          <h5 id="buttonBox__description">Record</h5>
        </div>
        <div className="transportButtons__buttonBox">
          <div className="transportButtons__buttonBox__circleInactive">
            <Undo id="transportIcon" fontSize="large" color="disabled" />
          </div>
          <h5 id="buttonBox__description">Undo</h5>
        </div>

        {/*--------------MEtronome!!-------*/}
        <div className="transportButtons__buttonBox">
          <div
            className={
              clickMode
                ? "transportButtons__buttonBox__circleActive"
                : "transportButtons__buttonBox__circleInactive"
            }
            onClick={toggleClickMode}
          >
            <Schedule id="transportIcon" fontSize="large" color="primary" />
          </div>
          <h5 id="buttonBox__description">Click</h5>
        </div>
        <div className="transportButtons__buttonBox">
          <div
            onClick={toggleSnapMode}
            className={
              snapMode
                ? "transportButtons__buttonBox__circleActive"
                : "transportButtons__buttonBox__circleInactive"
            }
          >
            <div id="transport__snapCircleContents">
              <MusicNote fontSize="small" color="primary" />
              <MusicNote fontSize="small" color="primary" />
            </div>
          </div>
          <h5 id="buttonBox__description">Snap</h5>
        </div>
      </div>

      {/*--------------------progress bar----------------------------*/}
      {presetMode != 1 ? (
        <div className="placeHolder__seqProgress">
          <h3>current bar: {seqModeBar}</h3>
        </div>
      ) : (
        <div className="progressBar">
          <LinearProgress variant="determinate" value={25} />
        </div>
      )}

      {/*---------------------lazy load PresetBank component-------------*/}

      <Suspense fallback={<div>Loading...</div>}>
        <gameModeData.Provider value={contextValue}>
          <PresetBank0 />
        </gameModeData.Provider>
      </Suspense>

      {/*--------------------Mode Toggle Buttons----------------------------*/}

      <div className="toggleMode">
        <div className="toggleButtons">
          <div className="transportButtons__buttonBox">
            <div
              className={
                presetMode === 0
                  ? "transportButtons__buttonBox__circleActive"
                  : "transportButtons__buttonBox__circleInactive"
              }
            >
              <h5>🔊</h5>
            </div>
            <h5 id="buttonBox__description">Volume</h5>
          </div>

          <div className="transportButtons__buttonBox">
            <div
              onClick={() => setPresetMode(1)}
              className={
                presetMode === 1
                  ? "transportButtons__buttonBox__circleActive"
                  : "transportButtons__buttonBox__circleInactive"
              }
            >
              <h5>🔊</h5>
            </div>
            <h5 id="buttonBox__description">PlayPad</h5>
          </div>

          <div className="transportButtons__buttonBox">
            <div
              className={
                presetMode === 2
                  ? "transportButtons__buttonBox__circleActive"
                  : "transportButtons__buttonBox__circleInactive"
              }
            >
              <h5>🔊</h5>
            </div>
            <h5 id="buttonBox__description">LoopPad</h5>
          </div>

          <div className="transportButtons__buttonBox">
            <div
              onClick={() => setPresetMode(3)}
              className={
                presetMode === 3
                  ? "transportButtons__buttonBox__circleActive"
                  : "transportButtons__buttonBox__circleInactive"
              }
            >
              <h5>🔊</h5>
            </div>
            <h5 id="buttonBox__description">Sequencer</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameMode;
