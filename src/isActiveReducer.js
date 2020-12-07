import { isActiveConstructor } from "./helperFunctions";

export const initialState = isActiveConstructor();

const ACTIONS = {
  ACTIVATE: "activate",
};

const makeActive = (trackIndex, padIndex, isActiveArray) => {
  let localTrack = isActiveArray.find(
    (track) => track.trackIndex === trackIndex
  );
   let newValue = localTrack.activeArray.map((pad) => {
    if (pad.key === padIndex) {
      return { ...pad, isActive: true };
    } else {
      return pad;
    }
  });
  return newValue;
};

export const isActiveReducer = (isActiveArray, action) => {
  switch (action.type) {
    case ACTIONS.ACTIVATE:
      {
        return isActiveArray.map((track) => {
          if (track.trackIndex === action.payload.trackIndex) {
            return {
              ...track,
              activeArray: makeActive(
                action.payload.trackIndex,
                action.payload.padIndex,
                isActiveArray
              ),
            };
          }
          return track;
        });
      }
      break;
  }
};
