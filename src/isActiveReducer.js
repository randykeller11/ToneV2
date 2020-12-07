import { isActiveConstructor } from "./helperFunctions";

export const initialState = isActiveConstructor();

const ACTIONS = {
  ACTIVATE: "activate",
  DEACTIVATE: "deactivate",
};

const editValue = (trackIndex, padIndex, isActiveArray, newValue) => {
  let localTrack = isActiveArray.find(
    (track) => track.trackIndex === trackIndex
  );
  let newPadState = localTrack.activeArray.map((pad) => {
    if (pad.key === padIndex) {
      return { ...pad, isActive: newValue };
    } else {
      return pad;
    }
  });
  return newPadState;
};

export const isActiveReducer = (isActiveArray, action) => {
  switch (action.type) {
    case ACTIONS.ACTIVATE:
      {
        return isActiveArray.map((track) => {
          if (track.trackIndex === action.payload.trackIndex) {
            return {
              ...track,
              activeArray: editValue(
                action.payload.trackIndex,
                action.payload.padIndex,
                isActiveArray,
                true,
              ),
            };
          }
          return track;
        });
      }
      break;
    case ACTIONS.DEACTIVATE: {
      return isActiveArray.map((track) => {
        if (track.trackIndex === action.payload.trackIndex) {
          return {
            ...track,
            activeArray: editValue(
              action.payload.trackIndex,
              action.payload.padIndex,
              isActiveArray,
              false,
            ),
          };
        }
        return track;
      });
    }
  }
};
