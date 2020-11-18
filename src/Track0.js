import React, { useEffect, useState } from "react";
import useLoadPlayers from "./useLoadPlayers";

function Track0() {
  const [players, loading] = useLoadPlayers();
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
      <h1>track component connected</h1>
      <h1>{message && message}</h1>
    </div>
  );
}

export default Track0;
