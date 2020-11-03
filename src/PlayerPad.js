import React, { useContext } from "react";
import { dataLayer } from "./App";
import "./PlayerPad.css";

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

  const colors = [
    ["#4570E6", "#5DADEC", "#76D7EA"],
    ["#FD3A4A", "#FF8866", "#FF9980"],
    ["#FFFF66", "#BEE64B", "#3AA655"],
  ];

  const mystyle = {
    border: "2px solid darkgray",
    backgroundColor: colors[colorTheme][Math.floor(Math.random() * 3)],
  };
  return <div className="PlayerPad" style={mystyle}></div>;
}

export default PlayerPad;
