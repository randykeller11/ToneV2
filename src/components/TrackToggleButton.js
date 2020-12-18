import React, {useContext, useState} from 'react';
import {presetBankData} from './PresetDesign';
import './TrackToggleButton.css'

function TrackToggleButton({buttonColor, index}) {
    const {setCurrentTrack, currentTrack} = useContext(presetBankData);


    const isActive = currentTrack === index ? true : false;

    const inactiveStyle = {
        border: "2px solid darkgray",
        backgroundColor: buttonColor,
        opacity: "62%",
      };
    
      const activeStyle = {
        border: "4px solid dimgray",
        backgroundColor: buttonColor,
        opacity: "100%",
      };


    return (
        <div className="trackToggler_button"
        onClick={()=>setCurrentTrack(index)}
        style={isActive ? activeStyle : inactiveStyle}
  >

  </div>
    );
}

export default TrackToggleButton;
