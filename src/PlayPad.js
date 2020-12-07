import React,{useState, useContext} from 'react';
import './PlayPad.css';
import {presetBankData} from './PresetBank0';

function PlayPad({padColor, padIndex}) {

    const {dispatch, currentTrack} = useContext(presetBankData);

    const padLocation = {padIndex: padIndex, trackIndex: currentTrack}

    const [isActive, setIsActive] = useState(false);

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

    return (
        <div className="playPad"
        style={isActive ? activeStyle : inactiveStyle}
        onClick={()=>dispatch({type: 'activate', payload: padLocation})}
        >
        </div>
    );
}

export default PlayPad;
