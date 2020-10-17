import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import useTransport from "./useTransport";
import useKeyPress from "./useKeyPress";
import useRecord from "./useRecord";
import useLoadPlayers from "./useLoadPlayers";
import useKeyboard from "./useKeyboard";
import PlayerButton from "./PlayerButton";
import * as Tone from "tone";

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
      <dataLayer.Provider value={{ players, listeners }}>
        <div className="donut">
          <h1>🍩 Donut 5000</h1>
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
        </div>
      </dataLayer.Provider>
    );
  }
}

export default App;

////<--------------------------------------------📌📋📍📂
////<--------------------------------------------📌📋📍📂
//--------------------TO DO!!!!!!------------------------------
//
//               1. mpc style front end
//                  1a. buttons light up when pressed and on playback if active
//                      (practice scoping a function to pass down active state maybe use provider and context)
//                  2a. nice controls for volume, bpm, playstart, etc.
//                  3a. eventually design simple gui for piano roll
//               2.player functionality
//                  2a. player starts on button press
//                  3a. move Tone.start function to useEffect that runs afters players load
//                      (maybe add a main menu then run it after user presses start???)
//
//               3. recording functionality
//                  3a. metronome toggle
//                  3b. store time stamps in a Tone.part for each player on press
//                  3c. toggle recording functionality
//                  3d. should not record overlapping notes so it must first check the
//                      pattern state to make sure the press is not a duplicate before updating
//                  4d. ability to delete notes from pattern (prob will require GUI from 3a)
////<--------------------------------------------📌📋📍📂
////<--------------------------------------------📌📋📍📂