import { isActiveConstructor, editValue } from "../helperFunctions";

export const initialState = isActiveConstructor();


//object to translate reducer actions
const ACTIONS = {
  ACTIVATE: "activate",
  DEACTIVATE: "deactivate",
};


//reducer for isActive array
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