import React,{useState, useContext, useEffect} from 'react';
import './PlayPad.css';
import {presetBankData} from './PresetBank0';

function PlayPad({padColor, padIndex}) {

    const {dispatch, currentTrack, isActiveArray} = useContext(presetBankData);

    const [isActive, setisActive] = useState(false);

    const padLocation = {padIndex: padIndex, trackIndex: currentTrack}

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

      const activePadTarget = isActiveArray.find((track) => track.trackIndex === currentTrack);

      const accurateTarget = activePadTarget.activeArray.find((pad)=> pad.key === padIndex);

      useEffect(()=>{
       setisActive(accurateTarget.isActive);
      },[accurateTarget])

    return (
        <div className="playPad"
        style={isActive ? activeStyle : inactiveStyle}
        onClick={()=>dispatch({type: 'activate', payload: padLocation})}
        >
        </div>
    );
}

export default PlayPad;
