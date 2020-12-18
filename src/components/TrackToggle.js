import React from "react";
import "./TrackToggle.css";
import TrackToggleButton from "./TrackToggleButton";

function TrackToggle({ setCurrentTrack, currentTrack }) {
  const togglerColors = ["#5DADEC", "#FF8866", "#BEE64B", "#9400D3"];

  return <div className="trackTogglers"> 
  {togglerColors.map((color, i)=>(
      <TrackToggleButton buttonColor={color} index={i}/>
  ))}
  
  </div>
}

export default TrackToggle;


