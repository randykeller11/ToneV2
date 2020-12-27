const recsBankConstructor = () => {
  let _activeRecsArray = [];
  for (var i = 0; i < 4; i++) {
    _activeRecsArray.push({
      trackIndex: i,
      recordings: [],
    });
  }
  return _activeRecsArray;
};

export const initRecsBankState = recsBankConstructor();

const ACTIONS = {
  ADD: "add",
};

export const recsBankReducer = (recsBankState, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      {
        return recsBankState.map((track) => {
          if (track.trackIndex === action.payload.track) {
            return {
              ...track,
              recordings: [...track.recordings, action.payload.recs],
            };
          } else return track;
        });
      }
      break;
  }
};
