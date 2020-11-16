import React, { useState, useEffect } from "react";

function TimeStretch() {
  const [sampleBPM, setSampleBPM] = useState();
  const [projectBPM, setProjectBPM] = useState();
  const [adjustment, setAdjustment] = useState(null);

  const calculateAdjustment = (e) => {
      e.preventDefault()
    console.log(e.target.value);
  };

  useEffect(() => {
      if(sampleBPM){
        console.log("sample:", sampleBPM, "project:", projectBPM)
      }

  }, [sampleBPM, projectBPM]);

  return (
    <div>

    </div>
  );
}

export default TimeStretch;
