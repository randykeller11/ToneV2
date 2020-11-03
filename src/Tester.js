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
    sortedPlayers.push(localPlayers.filter((player, index) => index >= 4 && index < 8));
    sortedPlayers.push(localPlayers.filter((player, index) => index >= 8 && index < 12));
    sortedPlayers.push(localPlayers.filter((player, index) => index >= 12 && index < 16));
    return sortedPlayers.map((playerRow, colIndex)=>(
      <div className="donut__padRow">
        {playerRow.map((player, rowIndex)=>(
          <PlayerPad colorTheme={colorTheme} rowIndex={rowIndex} colIndex={colIndex}/>
        ))}
      </div>
    ));
  };

  const forwardSoundToggle = () => {
    const newValue = (colorTheme + 1) % 3;
    setColorTheme(newValue);
  }

  return (
    <div className="donut__practice">

      <div className="donut__transportButtons">
        <div className="donut__transportButtons__buttonBox">
          <button>⏯</button>
          <h5>Play</h5>
        </div>
        <div className="donut__transportButtons__buttonBox">
          <button>⏺</button>
          <h5>Record</h5>
        </div>
        <div className="donut__transportButtons__buttonBox">
          <button>↩️</button>
          <h5>Undo</h5>
        </div>
        <div className="donut__transportButtons__buttonBox">
          <button>🎼</button>
          <h5>Snap</h5>
        </div>
      </div>
      <div className="donut__progressBar">
        <LinearProgress variant="determinate" value={25} />
      </div>
      <div className="donut__playerPads">{makePlayPads()}</div>
      <div className="donut__toggleSounds">
        <button onClick={forwardSoundToggle}>New Sound Bank</button>
      </div>
      <div className="donut__toggleMode">
      </div>
    </div>
  );
}

export default Tester;
