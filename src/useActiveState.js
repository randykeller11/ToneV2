import React, { useState, useEffect } from "react";

function useActiveState(players) {
  //logic for button click event listeners
  const [buttonStates, setButtonStates] = useState([]);

  const makeButtonStates = (players) => {
    let statesArray = [];
    players.forEach((element) => {
      statesArray.push({
        active: false,
      });
    });
    setButtonStates(statesArray);
  };


  const updateActiveStates = (_index, status) => {
    //   console.log('its connected', name, status);
    const updatedStates = buttonStates.map((button, index) => index === _index ? {active: status} : button);
    setButtonStates(updatedStates);
  };

  return [makeButtonStates, buttonStates, updateActiveStates];
}

export default useActiveState;
