import { useState, useEffect } from "react";
import * as Tone from "tone";

import snare0 from "./Assets/glazeDrums/snare0.wav";
import snare1 from "./Assets/glazeDrums/snare1.wav";
import snare2 from "./Assets/glazeDrums/snare2.wav";
import snare3 from "./Assets/glazeDrums/snare3.wav";

import kick0 from "./Assets/glazeDrums/kick0.wav";
import kick1 from "./Assets/glazeDrums/kick1.wav";
import kick2 from "./Assets/glazeDrums/kick2.wav";
import kick3 from "./Assets/glazeDrums/kick3.wav";

import hit0 from "./Assets/glazeDrums/hit0.wav";
import hit1 from "./Assets/glazeDrums/hit1.wav";
import hit2 from "./Assets/glazeDrums/hit2.wav";
import hit3 from "./Assets/glazeDrums/hit3.wav";

import loop0 from "./Assets/glazeDrums/loop0.wav";
import loop1 from "./Assets/glazeDrums/loop1.wav";
import loop2 from "./Assets/glazeDrums/loop2.wav";
import loop3 from "./Assets/glazeDrums/loop3.wav";

const samples = [
  snare0,
  snare1,
  snare2,
  snare3,
  hit0,
  hit1,
  hit2,
  hit3,
  kick0,
  kick1,
  kick2,
  kick3,
  loop0,
  loop1,
  loop2,
  loop3,
];

const useBank0Players = () => {
  const [players, setPlayers] = useState(null);
  const [loading, setLoading] = useState(true);

  //load the player and audio buffers

  const loadToneBuffers = () => {
    const playerArray = [];
    samples.forEach((element) => {
      playerArray.push(new Tone.Player({ url: element }).toDestination());
    });


    // const hhPlayer = new Tone.Player({
    //   url: hh,
    //   loop: true,
    // }).toDestination();

    Tone.loaded().then(() => {
      setPlayers(playerArray);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadToneBuffers();
  }, []);

  //once players are loaded set originial transport schedule and set up event listeners

  //render the sequencer

  return [players, loading];
};

export default useBank0Players;
