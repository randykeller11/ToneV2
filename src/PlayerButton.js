import React, {useEffect, useContext} from "react";
import './PlayerButton.css';
import * as Tone from "tone";
import {dataLayer} from './App';


function PlayerButton({index, isRecording}) {

  const {players, listeners} = useContext(dataLayer);

      useEffect(() => {
    if (listeners[index]) {
      Tone.start();
      players[index].start();
      //save time stamp to a Tone.part for the keys specific tone.player
    }

  }, [listeners[index]]);

    return (

      <div>
          <h1>🥂</h1>
      </div>
    );
  }


export default PlayerButton;
