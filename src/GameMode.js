import React, { Suspense, useState, useEffect } from "react";
import useTransport from "./useTransport";
import { LinearProgress } from "@material-ui/core/";
import { PlayArrow, Mic, Undo, MusicNote, Schedule } from "@material-ui/icons";
import useToggle from "./useToggle";
import "./GameMode.css";
import PresetBank0 from "./PresetBank0";

const Track0 = React.lazy(() => import("./PresetBank0"));

function GameMode() {
  //which presetBank the app is using and what mode it is in
  const [presetBank, setPresetBank] = useState(false);
  const [presetMode, setPresetMode] = useState(0);


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

  

  return (
    <div className="mainGame">
      <div className="togglePreset"
        style={{display: "flex", justifyContent: "center"}}
      >
        <h1> 🍩 Donut 5000</h1>
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
      <div className="progressBar">
        <LinearProgress variant="determinate" value={25} />
      </div>

      {/*---------------------lazy load PresetBank component-------------*/}

      <Suspense fallback={<div>Loading...</div>}>
          <PresetBank0 isRecording={isRecording} snapMode={snapMode} isPlaying={isPlaying} clickMode={clickMode} presetMode={presetMode}/>
      </Suspense>

      {/*--------------------Mode Toggle Buttons----------------------------*/}

      <div className="toggleMode">
        <h5> Mode toggle buttons</h5>
      </div>


    </div>
  );
}

export default GameMode;
