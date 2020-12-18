import React, { useContext, useState, useEffect } from "react";
import "./SequencerItem.css";
import { presetBankData } from "../PresetDesign";

function SequencerItem({ rowIndex, itemIndex }) {
  const [targetRender, setTargetRender] = useState(null);

  const {
    currentTrack,
    recState,
    recDispatch,
    padsRecMode,
    setPadsRecMode,
  } = useContext(presetBankData);

  const togglerColors = ["#5DADEC", "#FF8866", "#BEE64B", "#9370DB"];

  const inactiveStyle = {
    backgroundColor: togglerColors[currentTrack],
    opacity: "62%",
  }

  const activeStyle = {
    backgroundColor: togglerColors[currentTrack],
    opacity: "100%",
  }

  useEffect(() => {
    setTargetRender(
      <div
        className="sequencer__item"
        style={inactiveStyle}
      ></div>
    );
  }, [recState, currentTrack]);

  return targetRender;
}

export default SequencerItem;
