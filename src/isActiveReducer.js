import {isActiveConstructor} from './helperFunctions';


export const initialState = isActiveConstructor();

const ACTIONS = {
  ACTIVATE: 'activate',
}

// const makeActive = (trackIndex, padIndex) => {
//   let localArray = [...isActiveArray];
//   localArray.filter(_track => _track.trackIndex === trackIndex);
//   localArray.activeArray.map(pad=>{
//     pad.padIndex === padIndex ? {...pad, isActive: true} : pad
//   })
// }



export const isActiveReducer = (isActiveArray, action) =>{
    switch (action.type){
      case ACTIONS.ACTIVATE: {
        return isActiveArray.map(track => {
          if(track.trackIndex === action.payload.trackIndex){
            return {...track, activeArray: [0,0]}
          }
          return track;
        })
      }
    }
  }