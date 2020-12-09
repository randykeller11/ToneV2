import { useState, useEffect, useRef } from "react";
import * as Tone from 'tone';

const useTransport = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(75);

  const handleBpmChange = (e) => {
    setBpm(e.target.value);
  }


  useEffect(()=>{
    Tone.Transport.bpm.value = bpm;
  },[bpm]);




  const usePlayButton = () => {
    if (Tone.Transport.state === 'stopped') {
      setIsPlaying(true);
          Tone.Transport.scheduleRepeat(()=>{
      console.log(Tone.Transport.position);
    }, "16n");
      Tone.Transport.start("+0.1","1:0:0");
    } else {
      setIsPlaying(false);
      Tone.Transport.stop();
      Tone.Transport.position = '0:0:0';
    }
  };



  return [isPlaying, usePlayButton, bpm, handleBpmChange];
};

export default useTransport;
