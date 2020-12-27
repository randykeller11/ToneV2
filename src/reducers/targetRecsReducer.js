const targetRecsConstructor = () => {
  let _targetRecsArray = [];
  for (var i = 0; i < 4; i++) {
    _targetRecsArray.push({
      trackIndex: i,
      targetRecIndex: null,
      trackRecs: 0,
    });
  }
  return _targetRecsArray;
};

export const initTargetRecState = targetRecsConstructor();

const ACTIONS = {
  ADDINIT: "add-init",
  ADD: "add",
};

export const targetRecsReducer = (targetRecState, action) => {
  switch (action.type) {
    case ACTIONS.ADDINIT:
      {
        return targetRecState.map((track) => {
          if (track.trackIndex === action.payload) {
            return { ...track, targetRecIndex: 0, trackRecs: 1 };
          } else {
            return track;
          }
        });
      }
      break;
    case ACTIONS.ADD:
      {
        return targetRecState.map((track) => {
          if (track.trackIndex === action.payload) {
            return {
              ...track,
              targetRecIndex: track.targetRecIndex + 1,
              trackRecs: track.trackRecs + 1,
            };
          } else {
            return track;
          }
        });
      }
      break;
  }
};
