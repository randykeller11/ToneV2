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

export const initRecsBankState = [];

const ACTIONS = {
  ADD: "add",
};

export const recsBankReducer = (recsBankState, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      {
        return [
          ...recsBankState,
          {
            track: action.payload.track,
            recIndex: action.payload.recIndex,
            recordings: action.payload.recs,
          },
        ];
      }
      break;
  }
};
