import React, { Suspense } from "react";
const Track0 = React.lazy(() => import("./Track0"));
function GameMode() {
  return (
    <div>
      <h1>top stuff</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Track0 />
      </Suspense>
      <h1>bottom stuff</h1>
    </div>
  );
}

export default GameMode;
