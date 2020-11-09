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
      Tone.Transport.start("+0.1");
    } else {
      setIsPlaying(false);
      Tone.Transport.stop();
    }
  };



  return [isPlaying, usePlayButton, bpm, handleBpmChange];
};

export default useTransport;
