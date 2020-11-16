import React, {useState, useEffect} from 'react';

function usePadColors() {
    const [padColors, setPadColors] = useState([]);
    const padColorsContructor = (players) => {
        let statesArray = [];
        players.forEach((element, i) => {
          statesArray.push({
            key: i,
            color: Math.floor(Math.random() * 3),
          });
        });
        setPadColors(statesArray);
    }

    return [padColors, padColorsContructor];
}

export default usePadColors;
