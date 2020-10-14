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

   if(listeners[index]){
    return (

      <div className="donut__pads__padActive">
      </div>
    );
   }
   else {
    return (

      <div className="donut__pads__pad">
      </div>
    );
   }
  }


export default PlayerButton;
