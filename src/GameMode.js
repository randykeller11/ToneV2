import React, { Suspense, useState, useEffect } from "react";
const Track0 = React.lazy(() => import("./Track0"));
const Track1 = React.lazy(() => import("./Track1"));

function GameMode() {
    const [track, setTrack] = useState(false);



  return (
    <div>
      <h1>top stuff</h1>
        <button onClick={()=>setTrack(!track)}>toggle</button>


      <Suspense fallback={<div>Loading...</div>}>
        {track ? <Track1 /> : <Track0/>}
      </Suspense>
      <h1>bottom stuff</h1>
    </div>
  );
}

export default GameMode;
