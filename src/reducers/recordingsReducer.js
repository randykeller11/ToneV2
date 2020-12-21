import {
  activeRecsConstructor,
  targetRecsConstructor,
} from "../helperFunctions";

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
        let targetTrack = recState.targetRecs.find(
          (track) => track.trackIndex === action.payload.track
        );
        if (targetTrack.trackRecs === 0) {
          let localArray = [...recState.targetRecs];
          localArray.map((track) => {
            if (track.trackIndex === action.payload.track) {
              let updatedTrack = {
                ...track,
                targetRecIndex: 0,
                trackRecs: 1,
              };
              // console.log('i found the right track', updatedTrack);
              return updatedTrack;
            } else return track;
          });
          console.log('first record function ran properly',localArray);
          return {
            targetRecs: localArray,
            recsBank: [...recState.recsBank, action.payload],
          };
        }
        // console.log(action.payload.newRec);
        else {
          let localArray = [...recState.targetRecs];
          localArray.map((track) => {
            if (track.trackIndex === action.payload.track) {
              return {
                ...track,
                targetRecIndex: track.targetRecIndex + 1,
                trackRecs: track.trackRecs + 1,
              };
            } else return track;
          });
          return {
            targetRecs: localArray,
            recsBank: [...recState.recsBank, action.payload],
          };
        }
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
