import React, { useEffect, useContext, useState } from "react";
import "./PlayerButton.css";
import * as Tone from "tone";
import { dataLayer } from "./App";

function PlayerButton({ index, isRecording }) {
  const [isActive, setIsActive] = useState(false);
  const { players, listeners } = useContext(dataLayer);
  const [keyPressedUp, keyPressedDown, setKeyPressedUp] = listeners[index];

  const transportTime = Tone.Transport.position;

  const downHandler = () => {
    console.log('down', transportTime);
    setIsActive(true);
  }

  const upHandler = () =>{
    console.log('up', transportTime);
    setIsActive(false);

  }

  useEffect(() => {
    if (keyPressedDown) {
      // players[index].start();
      //save time stamp to a Tone.part for the keys specific tone.player
      downHandler();

    }
  }, [keyPressedDown]);

  useEffect(() => {
    if (keyPressedUp) {
      // players[index].start();
      //save time stamp to a Tone.part for the keys specific tone.player
      upHandler();
      setKeyPressedUp(false);
    }
  }, [keyPressedUp]);


  return (
    <div
      onMouseDown={downHandler}
      onMouseUp={upHandler}
      onMouseLeave={upHandler}
      className="donut__pads__pad"
    >
      {isActive ? (
        <div className="donut__pads__padActive"></div>
      ) : (
        <div className="donut__pads__padInactive"></div>
      )}
    </div>
  );
}

export default PlayerButton;
