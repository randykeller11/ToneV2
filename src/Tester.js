import React, {useContext} from "react";
import "./Tester.css";
import {LinearProgress} from '@material-ui/core/';



function Tester() {
    const dataLayer = useContext(dataLayer);

    const makePlayerPads = () => {
        dataLayer.players.map((player) => (
            <h1>this is a player</h1>
        ))
    }


  return (
    <div className="donut__practice">
      {/* Title */}
      <div className="donut__transportButtons">
        <div className="donut__transportButtons__buttonBox">
          <button>⏯</button>
          <h5>Play</h5>
        </div>
        <div className="donut__transportButtons__buttonBox">
          <button>⏺</button>
          <h5>Record</h5>
        </div>
        <div className="donut__transportButtons__buttonBox">
          <button>↩️</button>
          <h5>Undo</h5>
        </div>
        <div className="donut__transportButtons__buttonBox">
          <button>🎼</button>
          <h5>Snap</h5>
        </div>
      </div>
      <div className="donut__progressBar">
      <LinearProgress variant="determinate" value={80} />
      </div>
      {/* pads */}
      <div className="donut__testPads">
          {

          }
        


      </div>
      {/* pick track */}
      <div className="donut__tracks">
        <h1>tracks</h1>
      </div>
      <div className="donut__toggle">
        <h1>main toggler</h1>
      </div>
      {/* modeToggler */}
    </div>
  );
}

export default Tester;
