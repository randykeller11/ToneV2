import React, { useContext, useEffect, useState } from "react";
import "./Sequencer.css";
import SequencerRow from "./SequencerRow";

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
      <h1>⬅️</h1>
      <div className="sequencer__grid">{gridBuilder()}</div>
      <h1>➡️</h1>
    </div>
  );
}

export default Sequencer;
