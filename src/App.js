import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import useTransport from "./useTransport";
import useKeyPress from "./useKeyPress";
import useRecord from "./useRecord";
import useLoadPlayers from "./useLoadPlayers";
import useKeyboard from "./useKeyboard";
import PlayerButton from "./PlayerButton";
import * as Tone from "tone";
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

export const dataLayer = React.createContext();

function App() {
  const [players, loading] = useLoadPlayers();
  const listeners = useKeyboard();

  const [
    isPlaying,
    usePlayButton,
    quantizeTransportPosition,
    bpm,
    handleBpmChange,
  ] = useTransport();

  const [recordingsConstructor, recordings] = useRecord();

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (!loading) {
      recordingsConstructor(players);
    }
  }, [loading]);


  if (loading) {
    return <h1>loading</h1>;
  } else {
    return (
      <dataLayer.Provider value={{players, listeners}}>
        <div className='donut'>
        <h1>🍩 Donut 5000</h1>

          <div className='donut__controls'>
            <button>play</button>
            <button>record</button>
            <button>metronome</button>
          </div>
          <div className="donut__pads">
          {players.map((player, index) => (
            <PlayerButton
              index={index}
              isRecording={isRecording}
            />
          ))}
        </div>

        </div>
      </dataLayer.Provider>
    );
  }
}

export default App;
