import React, { useEffect, useContext, useState } from "react";
import "./PlayerButton.css";
import * as Tone from "tone";
import { dataLayer } from "./App";

function PlayerButton({ index }) {
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
  const [keyPressedDown, keyPressedUp, setKeyPressedUp] = listeners[index];

  const isActive = isActiveArray[index].activeState;

  const transportTime = Tone.Transport.position;

  const makeButtonActive = () => {
    let localArrayActive = [...isActiveArray];
    const updatedStates = localArrayActive.map((player) =>
      player.id === index ? { id: index, activeState: true } : player
    );
    setIsActive(updatedStates);
  };

  //make this a custom hook 👇🏾👇🏾👇🏾👇🏾
  const downHandler = () => {
    makeButtonActive();
    console.log(index, "down", transportTime);
    players[index].start();
  };

  const upHandler = () => {
    if (isActive) {
      let localArray = [...isActiveArray];
      const updatedStates = localArray.map((player) =>
        player.id === index ? { id: index, activeState: false } : player
      );
      setIsActive(updatedStates);
      console.log(index, "up", transportTime);
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

  return (
    <div
      onMouseDown={downHandler}
      onMouseUp={upHandler}
      onMouseLeave={upHandler}
      className={
        isActive ? "donut__pads__padActive" : "donut__pads__padInactive"
      }
    ></div>
  );
}

export default PlayerButton;
