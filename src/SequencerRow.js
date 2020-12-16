import React from "react";
import SequencerItem from "./SequencerItem";
import "./SequencerRow.css";

function SequencerRow({ rowIndex }) {
  const rowBuilder = () => {
    let localArray = [];
    for (var i = 0; i < 16; i++) {
      localArray.push(i);
    }
    return localArray.map((itemIndex) => {
      return <SequencerItem rowIndex={rowIndex} itemIndex={itemIndex} />;
    });
  };

  return <div className="sequencer__row">{rowBuilder()}</div>;
}

export default SequencerRow;
