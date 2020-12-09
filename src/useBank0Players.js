import { useState, useEffect } from "react";
import * as Tone from "tone";

import alcDrumLoop01 from "./Assets/presetBank0/AlcDrumLoop01.wav";
import alcDrumLoop02 from "./Assets/presetBank0/AlcDrumLoop02.wav";
import alcDrumLoop03 from "./Assets/presetBank0/AlcDrumLoop03.wav";
import alcDrumLoop04 from "./Assets/presetBank0/AlcDrumLoop04.wav";
import alcDrumLoop05 from "./Assets/presetBank0/AlcDrumLoop05.wav";
import alcDrumLoop06 from "./Assets/presetBank0/AlcDrumLoop06.wav";
import alcDrumLoop07 from "./Assets/presetBank0/AlcDrumLoop07.wav";
import alcDrumLoop08 from "./Assets/presetBank0/AlcDrumLoop08.wav";

import shuffDrumLoop01 from "./Assets/presetBank0/ShuffDrumLoop01.wav";
import shuffDrumLoop02 from "./Assets/presetBank0/ShuffDrumLoop02.wav";
import shuffDrumLoop03 from "./Assets/presetBank0/ShuffDrumLoop03.wav";
import shuffDrumLoop04 from "./Assets/presetBank0/ShuffDrumLoop04.wav";
import shuffDrumLoop05 from "./Assets/presetBank0/ShuffDrumLoop05.wav";
import shuffDrumLoop06 from "./Assets/presetBank0/ShuffDrumLoop06.wav";
import shuffDrumLoop07 from "./Assets/presetBank0/ShuffDrumLoop07.wav";
import shuffDrumLoop08 from "./Assets/presetBank0/ShuffDrumLoop08.wav";

import SoulLoopFm01 from "./Assets/presetBank0/SoulLoopFm01.wav";
import SoulLoopFm02 from "./Assets/presetBank0/SoulLoopFm02.wav";
import SoulLoopFm03 from "./Assets/presetBank0/SoulLoopFm03.wav";
import SoulLoopFm04 from "./Assets/presetBank0/SoulLoopFm04.wav";
import SoulLoopFm05 from "./Assets/presetBank0/SoulLoopFm05.wav";
import SoulLoopFm06 from "./Assets/presetBank0/SoulLoopFm06.wav";
import SoulLoopFm07 from "./Assets/presetBank0/SoulLoopFm07.wav";
import SoulLoopFm08 from "./Assets/presetBank0/SoulLoopFm08.wav";
import SoulLoopFm09 from "./Assets/presetBank0/SoulLoopFm09.wav";
import SoulLoopFm10 from "./Assets/presetBank0/SoulLoopFm10.wav";
import SoulLoopFm11 from "./Assets/presetBank0/SoulLoopFm11.wav";
import SoulLoopFm12 from "./Assets/presetBank0/SoulLoopFm12.wav";
import SoulLoopFm13 from "./Assets/presetBank0/SoulLoopFm13.wav";
import SoulLoopFm14 from "./Assets/presetBank0/SoulLoopFm14.wav";
import SoulLoopFm15 from "./Assets/presetBank0/SoulLoopFm15.wav";
import SoulLoopFm16 from "./Assets/presetBank0/SoulLoopFm16.wav";

import BassLoop1Fm01 from "./Assets/presetBank0/BassLoop1Fm01.wav";
import BassLoop1Fm02 from "./Assets/presetBank0/BassLoop1Fm02.wav";
import BassLoop1Fm03 from "./Assets/presetBank0/BassLoop1Fm03.wav";
import BassLoop1Fm04 from "./Assets/presetBank0/BassLoop1Fm04.wav";
import BassLoop1Fm05 from "./Assets/presetBank0/BassLoop1Fm05.wav";
import BassLoop1Fm06 from "./Assets/presetBank0/BassLoop1Fm06.wav";
import BassLoop1Fm07 from "./Assets/presetBank0/BassLoop1Fm07.wav";
import BassLoop1Fm08 from "./Assets/presetBank0/BassLoop1Fm08.wav";

import BassLoop2Fm01 from "./Assets/presetBank0/BassLoop2Fm01.wav";
import BassLoop2Fm02 from "./Assets/presetBank0/BassLoop2Fm02.wav";
import BassLoop2Fm03 from "./Assets/presetBank0/BassLoop2Fm03.wav";
import BassLoop2Fm04 from "./Assets/presetBank0/BassLoop2Fm04.wav";
import BassLoop2Fm05 from "./Assets/presetBank0/BassLoop2Fm05.wav";
import BassLoop2Fm06 from "./Assets/presetBank0/BassLoop2Fm06.wav";
import BassLoop2Fm07 from "./Assets/presetBank0/BassLoop2Fm07.wav";
import BassLoop2Fm08 from "./Assets/presetBank0/BassLoop2Fm08.wav";

import keysLoop01 from "./Assets/presetBank0/keysLoop01.wav";
import keysLoop02 from "./Assets/presetBank0/keysLoop02.wav";
import keysLoop03 from "./Assets/presetBank0/keysLoop03.wav";
import keysLoop04 from "./Assets/presetBank0/keysLoop04.wav";
import keysLoop05 from "./Assets/presetBank0/keysLoop05.wav";
import keysLoop06 from "./Assets/presetBank0/keysLoop06.wav";
import keysLoop07 from "./Assets/presetBank0/keysLoop07.wav";
import keysLoop08 from "./Assets/presetBank0/keysLoop08.wav";
import keysLoop09 from "./Assets/presetBank0/keysLoop09.wav";
import keysLoop10 from "./Assets/presetBank0/keysLoop10.wav";
import keysLoop11 from "./Assets/presetBank0/keysLoop11.wav";
import keysLoop12 from "./Assets/presetBank0/keysLoop12.wav";
import keysLoop13 from "./Assets/presetBank0/keysLoop13.wav";
import keysLoop14 from "./Assets/presetBank0/keysLoop14.wav";
import keysLoop15 from "./Assets/presetBank0/keysLoop15.wav";
import keysLoop16 from "./Assets/presetBank0/keysLoop16.wav";

import metronome from "./Assets/metronome.wav";

const samples = [
  [
    alcDrumLoop01,
    alcDrumLoop02,
    alcDrumLoop03,
    alcDrumLoop04,
    alcDrumLoop05,
    alcDrumLoop06,
    alcDrumLoop07,
    alcDrumLoop08,
    shuffDrumLoop01,
    shuffDrumLoop02,
    shuffDrumLoop03,
    shuffDrumLoop04,
    shuffDrumLoop05,
    shuffDrumLoop06,
    shuffDrumLoop07,
    shuffDrumLoop08,
  ],
  [
    SoulLoopFm01,
    SoulLoopFm02,
    SoulLoopFm03,
    SoulLoopFm04,
    SoulLoopFm05,
    SoulLoopFm06,
    SoulLoopFm07,
    SoulLoopFm08,
    SoulLoopFm09,
    SoulLoopFm10,
    SoulLoopFm11,
    SoulLoopFm12,
    SoulLoopFm13,
    SoulLoopFm14,
    SoulLoopFm15,
    SoulLoopFm16,
  ],
  [
    BassLoop1Fm01,
    BassLoop1Fm02,
    BassLoop1Fm03,
    BassLoop1Fm04,
    BassLoop1Fm05,
    BassLoop1Fm06,
    BassLoop1Fm07,
    BassLoop1Fm08,
    BassLoop2Fm01,
    BassLoop2Fm02,
    BassLoop2Fm03,
    BassLoop2Fm04,
    BassLoop2Fm05,
    BassLoop2Fm06,
    BassLoop2Fm07,
    BassLoop2Fm08,
  ],
  [
    keysLoop01,
    keysLoop02,
    keysLoop03,
    keysLoop04,
    keysLoop05,
    keysLoop06,
    keysLoop07,
    keysLoop08,
    keysLoop09,
    keysLoop10,
    keysLoop11,
    keysLoop12,
    keysLoop13,
    keysLoop14,
    keysLoop15,
    keysLoop16,
  ],
];

const useBank0Players = () => {
  const [players, setPlayers] = useState(null);
  const [loading, setLoading] = useState(true);

  //load the player and audio buffers

  const loadToneBuffers = () => {
    const playerArray = [];
    samples.forEach((track) => {
      let localArray = [];
      track.forEach((element) => {
        localArray.push(new Tone.Player({ url: element }).toDestination());
      });
      playerArray.push(localArray);
    });
    const _metronome = new Tone.Player({
      url: metronome,
    }).toDestination();

    playerArray.push(_metronome);
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

// const hhPlayer = new Tone.Player({
//   url: hh,
//   loop: true,
// }).toDestination();
