import React, { Suspense, useState, useEffect } from "react";
import useTransport from "./useTransport";
import { LinearProgress } from "@material-ui/core/";
import { PlayArrow, Mic, Undo, MusicNote, Schedule } from "@material-ui/icons";
import useToggle from "./useToggle";
import "./GameMode.css";

const Track0 = React.lazy(() => import("./Track0"));
const Track1 = React.lazy(() => import("./Track1"));

function GameMode() {
  const [presetBank, setPresetBank] = useState(false);
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

  return (
    <div className="mainGame">
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
      <div className="progressBar">
        <LinearProgress variant="determinate" value={25} />
      </div>

      {/*---------------------lazy load PresetBank component-------------*/}

      <Suspense fallback={<div>Loading...</div>}>
        <transportData.Provider value={providerValue}>
          <Track1 />
        </transportData.Provider>
      </Suspense>

      {/*--------------------Mode Toggle Buttons----------------------------*/}

      <div className="toggleMode">
        <h5> Mode toggle buttons</h5>
      </div>
    </div>
  );
}

export default GameMode;
