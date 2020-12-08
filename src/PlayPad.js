import React,{useState, useContext, useEffect} from 'react';
import './PlayPad.css';
import {presetBankData} from './PresetBank0';

function PlayPad({padColor, padIndex}) {

    const {dispatch, currentTrack, isActiveArray, players} = useContext(presetBankData);

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

      const activeTrackTarget = isActiveArray.find((track) => track.trackIndex === currentTrack);

      const activePadTarget = activeTrackTarget.activeArray.find((pad)=> pad.key === padIndex);

      useEffect(()=>{
       setisActive(activePadTarget.isActive);
      },[activePadTarget])

      const downHandler = () => {
        dispatch({type: 'activate', payload: padLocation});
        players[currentTrack][padIndex].start();
      }

      const upHandler = () => {
        dispatch({type: 'deactivate', payload: padLocation});
      }

    return (
        <div className="playPad"
        style={isActive ? activeStyle : inactiveStyle}
        onMouseDown={downHandler}
        onMouseUp={upHandler}
        >
        </div>
    );
}

export default PlayPad;
