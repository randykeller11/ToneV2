import React, { useState, useEffect } from "react";

function useActiveState(players) {
  //logic for button click event listeners
  const [recordings, setRecordings] = useState([]);

  const recordingsConstructor = (players) => {
    let statesArray = [];
    players.forEach((element, i) => {
      statesArray.push({
        key: i,
        part: []
      });
    });
    setRecordings(statesArray);
  };


  // const updateActiveStates = (_index, status) => {
  //   //   console.log('its connected', name, status);
  //   const updatedStates = buttonStates.map((button, index) => index === _index ? {active: status} : button);
  //   setButtonStates(updatedStates);
  // };

  return [recordingsConstructor, recordings];
}

export default useActiveState;
