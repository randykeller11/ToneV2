import React, { useState } from "react";

function useActiveArray() {
  const [padStates, setPadStates] = useState([]);


  return [padColors, padColorsContructor];
}

export default useActiveArray;
