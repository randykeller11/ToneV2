import React, { useContext, useState } from "react";
import "./Tester.css";
import { LinearProgress } from "@material-ui/core/";
import { dataLayer } from "./App";
import PlayerPad from "./PlayerPad";

function Tester() {
  const [colorTheme, setColorTheme] = useState(0);

  const {
    players,
    listeners,
    isActiveArray,
    setIsActive,
    isRecording,
    isPlaying,
    setRecordings,
    recordings,
  } = useContext(dataLayer);

  const makePlayPads = () => {
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
    return sortedPlayers.map((playerRow, colIndex) => (
      <div className="donut__padRow">
        {playerRow.map((player, rowIndex) => (
          <PlayerPad
            colorTheme={colorTheme}
            rowIndex={rowIndex}
            colIndex={colIndex}
          />
        ))}
      </div>
    ));
  };

  const forwardSoundToggle = () => {
    const newValue = (colorTheme + 1) % 3;
    setColorTheme(newValue);
  };

  return (
    <div className="practice">
      <div className="transportButtons">
        <div className="transportButtons__buttonBox">
          <div className="transportButtons__buttonBox__circle"></div>
          <h5 id="buttonBox__description">Play</h5>
        </div>
        <div className="transportButtons__buttonBox">
          <div className="transportButtons__buttonBox__circle"></div>
          <h5 id="buttonBox__description">Record</h5>
        </div>
        <div className="transportButtons__buttonBox">
          <div className="transportButtons__buttonBox__circle"></div>
          <h5 id="buttonBox__description">Undo</h5>
        </div>
        <div className="transportButtons__buttonBox">
          <div className="transportButtons__buttonBox__circle"></div>
          <h5 id="buttonBox__description">Snap</h5>
        </div>
      </div>
      <div className="progressBar">
        <LinearProgress variant="determinate" value={25} />
      </div>
      <div className="playerPads">{makePlayPads()}</div>
      <div className="toggleSounds">
        <button onClick={forwardSoundToggle}>New Sound Bank</button>
      </div>
      <div className="toggleMode"></div>
    </div>
  );
}

export default Tester;
