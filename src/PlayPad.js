import React,{useState} from 'react';
import './PlayPad.css';

function PlayPad({padColor, padIndex}) {

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
        style={isActive ? activeStyle : inactiveStyle}>
        </div>
    );
}

export default PlayPad;
