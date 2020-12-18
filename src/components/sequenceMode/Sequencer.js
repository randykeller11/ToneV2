import React, { useContext, useEffect, useState } from "react";
import "./Sequencer.css";
import SequencerRow from "./SequencerRow";
import {presetBankData} from '../PresetDesign';

function Sequencer() {

  const gridBuilder = () => {
    let localArray = [];
    for (var i = 0; i < 16; i++) {
      localArray.push(i);
    }
    return localArray.map((rowIndex) => {
      return (
          <SequencerRow rowIndex={rowIndex} />
      );
    });
  };

  return (
    <div className="sequencer">
      <h1 className="sequencer__arrow">⬅️</h1>
      <div className="sequencer__grid">{gridBuilder()}</div>
      <h1 className="sequencer__arrow">➡️</h1>
    </div>
  );
}

export default Sequencer;
