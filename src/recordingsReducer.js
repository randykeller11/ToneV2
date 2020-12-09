import {
  activeRecsConstructor,
  targetRecsConstructor,
} from "./helperFunctions";

export const initialRecState = {
  targetRecs: targetRecsConstructor(),
  recsBank: [],
};

const ACTIONS = {
  ADD: "add",
};

export const recordingsReducer = (recState, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      {
        recState.recsBank.push(action.payload.newRec);
        recState.targetRecs.map((track) => {
          if (track.trackIndex === action.payload.trackIndex) {
            return {
              ...track,
              targetRecIndex: action.payload.recIndex,
              trackRecs: (track.trackRecs + 1),
            };
          } else {
            return track;
          }
        });
      }
      break;
  }
};

// const editValue = (trackIndex, padIndex, isActiveArray, newValue) => {
//   let localTrack = isActiveArray.find(
//     (track) => track.trackIndex === trackIndex
//   );
//   let newPadState = localTrack.activeArray.map((pad) => {
//     if (pad.key === padIndex) {
//       return { ...pad, isActive: newValue };
//     } else {
//       return pad;
//     }
//   });
//   return newPadState;
// };