import React, { useEffect, useContext, useState } from "react";
import "./PlayerButton.css";
import * as Tone from "tone";
import { dataLayer } from "./App";

function PlayerButton({ index, isRecording }) {
  const [isActive, setIsActive] = useState(false);
  const { players, listeners } = useContext(dataLayer);
  const [keyPressedDown, keyPressedUp, setKeyPressedUp] = listeners[index];

  const transportTime = Tone.Transport.position;

  const downHandler = () => {
    console.log(index,"down", transportTime);
    setIsActive(true);
    players[index].start();

  };

  const upHandler = () => {
    if (isActive) {
      console.log(index, "up", transportTime);
      setIsActive(false);
    }
  };






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
      className={isActive ? "donut__pads__padActive" : "donut__pads__padInactive"}
    >
    </div>
  );
}



export default PlayerButton;
