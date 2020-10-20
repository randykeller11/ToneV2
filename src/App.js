import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import useTransport from "./useTransport";
import useKeyPress from "./useKeyPress";
import useRecord from "./useRecord";
import useLoadPlayers from "./useLoadPlayers";
import useKeyboard from "./useKeyboard";
import PlayerButton from "./PlayerButton";
import * as Tone from "tone";
import ModeToggler from "./ModeToggler";

export const dataLayer = React.createContext();

function App() {
  const [gameState, setGameState] = useState(0);

  const [players, loading] = useLoadPlayers();
  const listeners = useKeyboard();

  const [
    isPlaying,
    usePlayButton,
    quantizeTransportPosition,
    bpm,
    handleBpmChange,
  ] = useTransport();


  //Make this a custom hook 👇🏾👇🏾👇🏾
  const [isActiveArray, setIsActive] = useState(null);
  const isActiveArrayConstructor = (players) => {
    let localArray = []
    players.map((player, i)=>(localArray.push({id: i, activeState: false})));
    setIsActive(localArray);
  }


  const [transportTime, setTransportTime] = useState("0:0:0");

  const [recordingsConstructor, recordings] = useRecord();

  const [isRecording, setIsRecording] = useState(false);

  const [metronome, setMetronome] = useState(null);



  useEffect(() => {
    if (!loading) {
      setGameState(1);
    }
  }, [loading]);

  const handleGameStart = () => {
    recordingsConstructor(players);
    isActiveArrayConstructor(players);
    setGameState(2);
    Tone.start();

    Tone.Transport.scheduleRepeat((time) => {
      setTransportTime(quantizeTransportPosition(Tone.Transport.position));
    }, "16n");
  };
  const metronomeButton = () => {

    const _metronome = new Tone.Part(
      (time) => {
        players[7].start();
      },
      [[0]]
    );
    _metronome.start(0);
    _metronome.loopEnd = "0:1:0";
    _metronome.loop = true;
    _metronome.humanize = true;
    setMetronome(_metronome);
  };


  if (gameState === 0) {
    return <h1>loading</h1>;
  } else if (gameState === 1) {
    return (
      <div className="donut__mainMenu">
        <h1>Welcome to the 🍩 Donut 5000 </h1>
        <button onClick={handleGameStart}>Start</button>
      </div>
    );
  } else if (gameState === 2) {
    return (
      <dataLayer.Provider value={{ players, listeners, setGameState, isActiveArray, setIsActive }}>
        <div className="donut">
          <h1>Player Mode</h1>
          <div className="donut__transportTime">
            <h3>Beats: {transportTime}</h3>
            <form onChange={handleBpmChange}>
              <input type="range" max={170} min={60} defaultValue={bpm} />
            </form>
            <h3>BPM: {bpm}</h3>
          </div>

          <div className="donut__controls">
            <button onClick={usePlayButton}>play</button>
            <button>record</button>
            <button onClick={metronomeButton}>metronome</button>
            <button>Clear</button>
            {/* {isPlaying && <h5>{transportTime}</h5>} */}
          </div>
          <div className="donut__pads">
            {players.map((player, index) => (
              <PlayerButton index={index} isRecording={isRecording} />
            ))}
          </div>
          <ModeToggler />
        </div>
      </dataLayer.Provider>
    );
  } else if ((gameState === 3)) {
    return (
      <dataLayer.Provider value={{ players, listeners, setGameState, isActiveArray, setIsActive }}>
        <div className="donut">
          <h1>arrangement Mode</h1>
          <div className="donut__transportTime">
            <h3>Beats: {transportTime}</h3>
            <form onChange={handleBpmChange}>
              <input type="range" max={170} min={60} defaultValue={bpm} />
            </form>
            <h3>BPM: {bpm}</h3>
          </div>

          <div className="donut__controls">
            <button onClick={usePlayButton}>play</button>
            <button>record</button>
            <button onClick={metronomeButton}>metronome</button>
            <button>Clear</button>
            {/* {isPlaying && <h5>{transportTime}</h5>} */}
          </div>
          <div className="donut__pads">
            {recordings.map((player, index) => (
              <PlayerButton index={index} isRecording={isRecording} />
            ))}
          </div>
          <ModeToggler />
        </div>
      </dataLayer.Provider>
    );
  }
}

export default App;