import React, {useEffect, useContext, useState} from "react";
import './PlayerButton.css';
import * as Tone from "tone";
import {dataLayer} from './App';


function PlayerButton({index, isRecording}) {
  const [isActive, setIsActive] = useState(false);

  const {players, listeners} = useContext(dataLayer);

      useEffect(() => {
    if (listeners[index]) {
      players[index].start();
      //save time stamp to a Tone.part for the keys specific tone.player
    }

  }, [listeners[index]]);

  const handleMouseDown = () => {
    setIsActive(true);
    players[index].start();


  }

      return(
        <div onMouseDown={handleMouseDown} onMouseUp={()=>setIsActive(false)} className="donut__pads__pad">
          {
            listeners[index] || isActive ? 
            <div className="donut__pads__padActive"></div> 
            : <div className="donut__pads__padInactive"></div>
          }

        </div>
      )
  }


export default PlayerButton;
