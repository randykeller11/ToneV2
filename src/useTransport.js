import { useState, useEffect, useRef } from "react";
import * as Tone from 'tone';

const useTransport = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const currentStepRef = useRef(0);
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
      Tone.start();
      Tone.Transport.start();
    } else {
      setIsPlaying(false);
      Tone.Transport.stop();
      currentStepRef.current = 0;
      setCurrentStep(0);
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
