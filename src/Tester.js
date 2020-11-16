import React, { useContext, useState, useEffect } from "react";
import "./Tester.css";
import { LinearProgress } from "@material-ui/core/";
import { dataLayer } from "./App";
import PlayerPad from "./PlayerPad";
import { PlayArrow, Mic, Undo, MusicNote, Schedule } from "@material-ui/icons";
import useTransport from "./useTransport";
import useToggle from "./useToggle";
import * as Tone from 'tone';

function Tester() {
  const [colorTheme, setColorTheme] = useState(0);
  const [playPads, setPlayPads] = useState(null);
  const [playPadColors, setPlayPadColors] = useState([]);
  const [metronome, setMetronome] = useState(null);

  const [isRecording, toggleRecord] = useToggle();
  const [clickMode, toggleClickMode] = useToggle();
  const [snapMode, toggleSnapMode] = useToggle();

  const [
    isPlaying,
    usePlayButton,
    bpm,
    handleBpmChange,
    quantizeTransportPosition,
  ] = useTransport();

  const {
    players,
    listeners,
    isActiveArray,
    setIsActive,
    setRecordings,
    recordings,
    setGameState,
  } = useContext(dataLayer);

  const calcPadIndex = (row, col) => {
    return row * 4 + col;
  };

  const makePlayPads = () => {
    return playPads.map((playerRow, colIndex) => (
      <div className="donut__padRow">
        {playerRow.map((player, rowIndex) => (
          <PlayerPad
            colorTheme={colorTheme}
            padIndex={calcPadIndex(rowIndex, colIndex)}
            isRecording={isRecording}
            quantizeTransportPosition={quantizeTransportPosition}
            snapMode={snapMode}
          />
        ))}
      </div>
    ));
  };

  const forwardSoundToggle = () => {
    const newValue = (colorTheme + 1) % 3;
    setColorTheme(newValue);
  };

  useEffect(() => {
    if (players) {
    }
  }, [colorTheme]);

  useEffect(() => {
    const sortedPlayers = [];
    const localPlayers = [...players[0]];
    sortedPlayers.push(localPlayers.filter((player, index) => index < 4));
    sortedPlayers.push(
      localPlayers.filter((player, index) => index >= 4 && index < 8)
    );
    sortedPlayers.push(
      localPlayers.filter((player, index) => index >= 8 && index < 12)
    );
    sortedPlayers.push(
      localPlayers.filter((player, index) => index >= 12 && index < 16)
    );

    setPlayPads(sortedPlayers);
  }, []);

  const metronomeButton = () => {

    const _metronome = new Tone.Part(
      (time) => {
        players[1].start();
      },
      [[0]]
    );
    _metronome.start(0);
    _metronome.loopEnd = "1:0:0";
    _metronome.loop = true;
    setMetronome(_metronome);
  };

  const handleClickModePress = () => {
    handleBpmChange();
    metronomeButton();
    toggleClickMode();
    // setGameState(3);
  };

  //metronome



  return (
    <div className="practice">

      {/*--------------------transport ----------------------------*/}
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
            onClick={handleClickModePress}
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
      
      {/*--------------------16 pads ----------------------------*/}
      <div className="playerPads">{playPads && makePlayPads()}</div>


      {/*--------------------toggle sound banks ----------------------------*/}
      <div className="toggleSounds">
        <button onClick={forwardSoundToggle}>New Sound Bank</button>
      </div>
      {/*-----toggle between play mode, record mode and volume control--------*/}
      <div className="toggleMode"></div>
    </div>
  );
}

export default Tester;
