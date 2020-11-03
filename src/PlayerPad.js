import React, {useContext} from 'react';
import { dataLayer } from "./App";
import './PlayerPad.css';

function PlayerPad({colIndex, rowIndex}) {

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

    const colors = ["#4570E6","#5DADEC", "#76D7EA"];

    const mystyle = {
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      }
    return (
        <div className="PlayerPad" style={mystyle}>

        </div>
    );
}

export default PlayerPad;
