import React, { useEffect, useState } from "react";
import "./App.css";
import useTransport from "./useTransport";
import useKeyPress from "./useKeyPress";
import useActiveState from "./useActiveState";
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

function App() {
  const [players, loading] = useLoadPlayers();
  const listeners = useKeyboard();

  // const [
  //   isPlaying,
  //   usePlayButton,
  //   quantizeTransportPosition,
  //   bpm,
  //   handleBpmChange,
  // ] = useTransport();

  const [makeButtonStates, buttonStates, updateActiveStates] = useActiveState();

  const [recordings, setRecordings] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const [isRecording, setIsRecording] = useState(false);

  //<--------------------------------------------📌📋📍📂
  //             16 event listeners 👇🏾👇🏾👇🏾👇🏾👇🏾
  //            (eventually move to custom hook that returns [button_0, button_1])
  //<--------------------------------------------📌📋📍📂

  //   useEffect(() => {
  //   if (button_0) {
  //     console.log('listener connected');
  //     Tone.start();
  //     players[5].start();
  //     // console.log(buttonStates);

  //     updateActiveStates(0, true);

  //     ////<--------------------------------------------📌📋📍📂
  //     ////<--------------------------------------------📌📋📍📂
  //     //play sound
  //     //save time stamp to a Tone.part for the keys specific tone.player
  //   }
  //   else{
  //     updateActiveStates(0, false);
  //   }
  // }, [button_0]);

  useEffect(() => {
    if (!loading) {
      makeButtonStates(players);
    }
  }, [loading]);

  if (loading) {
    return <h1>loading</h1>;
  } else {
    return (
      <div className="buttonsContainer">
        {players.map((player, index) => (
          <PlayerButton
            index={index}
            player={players[index]}
            activeState={buttonStates[index]}
            updateState={updateActiveStates}
            listener={listeners[index]}
            recordings={recordings[index]}
            isRecording={isRecording}
          />
        ))}
      </div>
    );
  }
}

export default App;

// const passActiveState = (name) => {
//   const targetState = buttonStates.filter((player)=> player.name === name);
//   return targetState[0];
// }
