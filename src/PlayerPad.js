import React from 'react';
import './PlayerPad.css';

function PlayerPad({colIndex, rowIndex}) {

    const colors = ["#4570E6","#5DADEC", "#0095B7", "#76D7EA"]

    const mystyle = {
        "border-radius": "10%",
        backgroundColor: colors[colIndex],
      }
    return (
        <div className="PlayerPad" style={mystyle}>

        </div>
    );
}

export default PlayerPad;
