import React, { useState, useEffect } from "react";

function useRecord(players) {
  //logic for button click event listeners
  const [recordings, setRecordings] = useState([]);

  const recordingsConstructor = (players) => {
    let statesArray = [];
    players.forEach((element, i) => {
      statesArray.push({
        key: i,
        part: null,
      });
    });
    setRecordings(statesArray);
  };



  return [recordingsConstructor, recordings, setRecordings,];
}

export default useRecord;

//function for recording
//   const updatedStates = buttonStates.map((button, index) => index === _index ? {active: status} : button);
