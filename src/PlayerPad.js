import React, { useContext, useEffect, useState } from "react";
import { dataLayer } from "./App";
import "./PlayerPad.css";
import * as Tone from "tone";


function PlayerPad({ colorTheme, colIndex, rowIndex }) {
  

  const {
    players,
    listeners,
    isActiveArray,
    setIsActive,
    isRecording,
    isPlaying,
    setRecordings,
    recordings,
  } = useContext(dataLayer);

  const padIndex = (colIndex * 4) + rowIndex;

  const [padColor, setPadColor] = useState(null); 

  const colors = [
    ["#4570E6", "#5DADEC", "#76D7EA"],
    ["#FD3A4A", "#FF8866", "#FF9980"],
    ["#FFFF66", "#BEE64B", "#3AA655"],
  ];


  const inactiveStyle = {
    border: "2px solid darkgray",
    backgroundColor: padColor,
    opacity: "62%",
  };

  const activeStyle = {
    border: "4px solid dimgray",
    backgroundColor: padColor,
    opacity: "100%",
  };

  useEffect(()=>{
    setPadColor(colors[colorTheme][Math.floor(Math.random() * 3)]);
  },[colorTheme])


  

  const [keyPressedDown, keyPressedUp, setKeyPressedUp] = listeners[padIndex];

  const isActive = isActiveArray[padIndex].activeState;

  const transportTime = Tone.Transport.position;

  const makeButtonActive = () => {
    let localArrayActive = [...isActiveArray];
    const updatedStates = localArrayActive.map((player) =>
      player.id === padIndex ? { id: padIndex, activeState: true } : player
    );
    setIsActive(updatedStates);
  };

  const downHandler = () => {
    makeButtonActive();
    console.log(padIndex, "down", transportTime);
    players[padIndex].start();
  };

  const upHandler = () => {
    if (isActive) {
      let localArray = [...isActiveArray];
      const updatedStates = localArray.map((player) =>
        player.id === padIndex ? { id: padIndex, activeState: false } : player
      );
      setIsActive(updatedStates);
      // console.log(index, "up", transportTime);
    }
  };

  useEffect(() => {
    if (keyPressedDown) {
      downHandler();
    }
  }, [keyPressedDown]);

  useEffect(() => {
    if (keyPressedUp) {
      upHandler();
      setKeyPressedUp(false);
    }
  }, [keyPressedUp]);




  return <div 
  onMouseDown={downHandler}
  onMouseUp={upHandler}
  onMouseLeave={upHandler}
  className="PlayerPad" style={isActive ? activeStyle : inactiveStyle}></div>;
}

export default PlayerPad;
