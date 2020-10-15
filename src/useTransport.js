import { useState, useEffect, useRef } from "react";
import * as Tone from 'tone';

const useTransport = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(72);

  const handleBpmChange = (e) => {
    setBpm(e.target.value);
  }


  useEffect(()=>{
    Tone.Transport.bpm.value = bpm;
  },[bpm]);




  const usePlayButton = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      Tone.Transport.start();
    } else {
      setIsPlaying(false);
      Tone.Transport.stop();
    }
  };

  const quantizeTransportPosition = (transportValue) => {
    const position = transportValue.split(':');
    const lastDigit = position[2].split('.');
    const quantizedPosition = [position[0], position[1], lastDigit[0]].join(':');
    return quantizedPosition;
  } 


  return [isPlaying, usePlayButton, quantizeTransportPosition, bpm, handleBpmChange];
};

export default useTransport;
