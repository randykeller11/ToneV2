import React, { useState, useEffect } from "react";

function TimeStretch() {
  const [sampleBPM, setSampleBPM] = useState(140);
  const [projectBPM, setProjectBPM] = useState(120);
  const [adjustment, setAdjustment] = useState(null);

  const handleProjectBpmChange = (e) => {
    setProjectBPM(e.target.value);
  };
  const handleSampleBpmChange = (e) => {
    setSampleBPM(e.target.value);
  };

  const calcAdjust = (project, sample) => {
    if (project - sample === 0) {
      return 0;
    } else if (project - sample > 0) {
      const increase = project - sample;
      return Math.floor((increase / sample) * 100); 
    }
    if (project - sample < 0) {
        const decrease = sample - project;
        return Math.floor((decrease / sample) * 100); 
    }
  };

  useEffect(() => {
    const adjustVariable = calcAdjust(projectBPM, sampleBPM);
    setAdjustment(adjustVariable);
  }, [projectBPM]);

  return (
    <div>
      <form onChange={handleProjectBpmChange}>
        <input type="range" max={170} min={60} defaultValue={projectBPM} />
      </form>
      <h3>project BPM: {projectBPM}</h3>
      <br />
      <br />
      <br />

      <form onChange={handleSampleBpmChange}>
        <input type="range" max={170} min={60} defaultValue={sampleBPM} />
      </form>
      <h3>sample BPM: {sampleBPM}</h3>
      <br />
      <br />
      <br />

      <h3>adjustment:{adjustment && adjustment}</h3>
    </div>
  );
}

export default TimeStretch;
