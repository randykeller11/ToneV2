import { useState, useEffect } from "react";
import * as Tone from "tone";

import snare from "./Assets/sounds/snare.wav";
import snare2 from "./Assets/sounds/snare2.wav";
import snare3 from "./Assets/sounds/snare3.wav";
import snare4 from "./Assets/sounds/snare4.wav";

import kick from "./Assets/sounds/kick.wav";
import kick2 from "./Assets/sounds/kick2.wav";
import kick3 from "./Assets/sounds/kick3.wav";
import kick4 from "./Assets/sounds/kick4.wav";

import hit from "./Assets/sounds/hit.wav";
import hit2 from "./Assets/sounds/hit2.wav";
import hit3 from "./Assets/sounds/hit3.wav";
import hit4 from "./Assets/sounds/hit4.wav";

import perc from "./Assets/sounds/perc.wav";
import perc2 from "./Assets/sounds/perc2.wav";
import perc3 from "./Assets/sounds/perc3.wav";
import perc4 from "./Assets/sounds/perc4.wav";

import _metronome from './Assets/sounds/met.wav';

const samples = [[
  snare,
  snare2,
  snare3,
  snare4,
  hit,
  hit2,
  hit3,
  hit4,
  perc,
  perc2,
  perc3,
  perc4,
  kick,
  kick2,
  kick3,
  kick4,
], _metronome];

const useLoadPlayers = () => {
  const [players, setPlayers] = useState(null);
  const [loading, setLoading] = useState(true);

  //load the player and audio buffers

  const loadToneBuffers = () => {
    const playerArray = [[]];
    samples[0].forEach((element) => {
      playerArray[0].push(new Tone.Player({ url: element }).toDestination());
    });



    const metronome = new Tone.Player({
      url: _metronome,
      loop: true,
    }).toDestination();

    playerArray.push(metronome);

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

export default useLoadPlayers;
