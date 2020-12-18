import React from "react";
import useBank0Players from "./useBank0Players";
import PresetDesign from "../components/PresetDesign";
function PresetBank0() {
  //custom hook for loading bank specific players
  const [players, loading] = useBank0Players();
  return <div>{players ? <PresetDesign players={players}/> : <h1>loading...</h1>}</div>;
}

export default PresetBank0;
