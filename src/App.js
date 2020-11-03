import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import useTransport from "./useTransport";
import useKeyPress from "./useKeyPress";
import useRecord from "./useRecord";
import useLoadPlayers from "./useLoadPlayers";
import useKeyboard from "./useKeyboard";
import PlayerButton from "./PlayerButton";
import * as Tone from "tone";
import Tester from './Tester';

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
    let localArray = [];
    players.map((player, i) => localArray.push({ id: i, activeState: false }));
    setIsActive(localArray);
  };

  const [transportTime, setTransportTime] = useState("0:0:0");

  const [recordingsConstructor, recordings, setRecordings] = useRecord();

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
      <dataLayer.Provider
        value={{
          players,
          listeners,
          setGameState,
          isActiveArray,
          setIsActive,
          isRecording,
          isPlaying,
          setRecordings,
          recordings
        }}
      >
          <Tester />
      </dataLayer.Provider>
    );
      }
}

export default App;
