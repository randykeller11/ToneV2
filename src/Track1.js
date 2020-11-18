import React, { useEffect, useState } from "react";
import useTrack1Players from './useTrack1Players';

function Track1() {
  const [players, loading] = useTrack1Players();
  const [message, setMessage] = useState();

  useEffect(() => {
    if (loading) {
      setMessage("players are loading");
    } else if (!loading) {
      setMessage("players are loaded 🏆");
    } else {
      setMessage("error");
    }
  }, [loading]);

  return (
    <div>
      <h1>second component connected</h1>
      <h1>{message && message}</h1>
    </div>
  );
}

export default Track1;
