import React, { useEffect } from "react";
import useKeyPress from "./useKeyPress";

function useKeyboard() {
  const button_0 = useKeyPress("1");
  const button_1 = useKeyPress("2");
  const button_2 = useKeyPress("3");
  const button_3 = useKeyPress("4");
  const button_4 = useKeyPress("q");
  const button_5 = useKeyPress("w");
  const button_6 = useKeyPress("e");
  const button_7 = useKeyPress("r");
  const button_8 = useKeyPress("a");
  const button_9 = useKeyPress("s");
  const button_10 = useKeyPress("d");
  const button_11 = useKeyPress("f");
  const button_12 = useKeyPress("z");
  const button_13 = useKeyPress("x");
  const button_14 = useKeyPress("c");
  const button_15 = useKeyPress("v");

  return [
    button_0,
    button_1,
    button_2,
    button_3,
    button_4,
    button_5,
    button_6,
    button_7,
    button_8,
    button_9,
    button_10,
    button_11,
    button_12,
    button_13,
    button_14,
    button_15,
  ];
}

export default useKeyboard;
