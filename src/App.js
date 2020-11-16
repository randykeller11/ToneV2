import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import useKeyPress from "./useKeyPress";
import useRecord from "./useRecord";
import useLoadPlayers from "./useLoadPlayers";
import useKeyboard from "./useKeyboard";
// import usePadColors from './usePadColors';
import * as Tone from "tone";
import Tester from './Tester';
import TimeStretch from './TimeStretch';


export const dataLayer = React.createContext();

function App() {
  const [gameState, setGameState] = useState(0);

  const [players, loading] = useLoadPlayers();
  const listeners = useKeyboard();



  //Make this a custom hook 👇🏾👇🏾👇🏾
  const [isActiveArray, setIsActive] = useState(null);
  const isActiveArrayConstructor = (players) => {
    let localArray = [];
    players.map((player, i) => localArray.push({ id: i, activeState: false }));
    setIsActive(localArray);
  };

  const [transportTime, setTransportTime] = useState("0:0:0");

  const [recordingsConstructor, recordings, setRecordings,] = useRecord();

  const [metronome, setMetronome] = useState(null);

  // const [padColors, padColorsContructor] = usePadColors();

  useEffect(() => {
    if (!loading) {
      setGameState(1);
    }
  }, [loading]);

  const handleGameStart = () => {
    recordingsConstructor(players[0]);
    isActiveArrayConstructor(players[0]);
    setGameState(3);
    Tone.start();

  };


  if (gameState === 0) {
    return <h1>loading</h1>;
  } 
  
  // intro screen
  else if (gameState === 1) {
    return (
      <div className="donut__mainMenu">
        <h1>Welcome to the 🍩 Donut 5000 </h1>
        <button onClick={handleGameStart}>Start</button>
      </div>
    );
  } 
  //main play mode
  else if (gameState === 2) {
    return (
      <dataLayer.Provider
        value={{
          players,
          listeners,
          setGameState,
          isActiveArray,
          setIsActive,
          setRecordings,
          recordings,
          // padColors,
        }}
      >
          <Tester />
      </dataLayer.Provider>
    );
      }
      //click mode that manages metronome and bpm
      else if (gameState === 3) {
        return <TimeStretch />
      }
}

export default App;
