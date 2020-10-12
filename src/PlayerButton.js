import React, {useEffect} from "react";
import './PlayerButton.css';
import * as Tone from "tone";


function PlayerButton({index, player, activeState, updateState, listener, recordings, isRecording}) {

      useEffect(() => {
    if (listener) {
      console.log('listener connected');
      Tone.start();
      player.start();
      // console.log(buttonStates);

      updateState(index, true);

      ////<--------------------------------------------📌📋📍📂
      ////<--------------------------------------------📌📋📍📂
      //play sound
      //save time stamp to a Tone.part for the keys specific tone.player
    }
    else{
      updateState(index, false);
    }
  }, [listener]);

    return (

      <div>
          <h1>🥂</h1>
      </div>
    );
  }


export default PlayerButton;
