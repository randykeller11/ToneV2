import React, { useContext, useState, useEffect } from "react";
import "./Tester.css";
import { LinearProgress } from "@material-ui/core/";
import { dataLayer } from "./App";
import PlayerPad from "./PlayerPad";
import { PlayArrow, Mic, Undo, MusicNote, Schedule } from "@material-ui/icons";
import useTransport from "./useTransport";

function Tester() {
  const [colorTheme, setColorTheme] = useState(0);
  const [playPads, setPlayPads] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const [
    isPlaying,
    usePlayButton,
    quantizeTransportPosition,
    bpm,
    handleBpmChange,
  ] = useTransport();

  const {
    players,
    listeners,
    isActiveArray,
    setIsActive,
    setRecordings,
    recordings,
  } = useContext(dataLayer);

  const toggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
    }
  };

  const makePlayPads = () => {
    return playPads.map((playerCol, rowIndex) => (
      <div className="donut__padRow">
        {playerCol.map((player, colIndex) => (
          <PlayerPad
            colorTheme={colorTheme}
            rowIndex={rowIndex}
            colIndex={colIndex}
            isRecording={isRecording}
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
    const sortedPlayers = [];
    const localPlayers = [...players];
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

  return (
    <div className="practice">
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
            <Undo id="transportIcon" fontSize="large" color="primary" />
          </div>
          <h5 id="buttonBox__description">Undo</h5>
        </div>
        <div className="transportButtons__buttonBox">
          <div className="transportButtons__buttonBox__circleInactive">
            <Schedule id="transportIcon" fontSize="large" color="primary" />
          </div>
          <h5 id="buttonBox__description">Click</h5>
        </div>
        <div className="transportButtons__buttonBox">
          <div className="transportButtons__buttonBox__circleInactive">
            <div id="transport__snapCircleContents">
              <MusicNote fontSize="small" color="primary" />
              <MusicNote fontSize="small" color="primary" />
            </div>
          </div>
          <h5 id="buttonBox__description">Snap</h5>
        </div>
      </div>
      <div className="progressBar">
        <LinearProgress variant="determinate" value={25} />
      </div>
      <div className="playerPads">{playPads && makePlayPads()}</div>
      <div className="toggleSounds">
        <button onClick={forwardSoundToggle}>New Sound Bank</button>
      </div>
      <div className="toggleMode"></div>
    </div>
  );
}

export default Tester;
