//convert transport position into nearest non decimal value
export const quantizeTransportPosition = (transportValue) => {
  const position = transportValue.split(":");
  const lastDigit = Math.round(position[2]);
  const quantizedPosition = [position[0], position[1], lastDigit].join(":");
  return quantizedPosition;
};


//function to sort pad colors for css
export const sortPadColorMap = (_trackMap) => {
  const sortedPads = [];
  const localPads = [..._trackMap];
  sortedPads.push(localPads.filter((player, index) => index < 4));
  sortedPads.push(localPads.filter((player, index) => index >= 4 && index < 8));
  sortedPads.push(
    localPads.filter((player, index) => index >= 8 && index < 12)
  );
  sortedPads.push(
    localPads.filter((player, index) => index >= 12 && index < 16)
  );

  return sortedPads;
};

//contructors for isActiveReducer

export const isActiveConstructor = () => {
  const trackConstructor = () => {
    let trackArray = [];
    for (var i = 0; i < 16; i++) {
      trackArray.push({
        key: i,
        isActive: false,
      });
    }
    return trackArray;
  };

  let _isActiveArray = [];
  for (var i = 0; i < 4; i++) {
    _isActiveArray.push({
      trackIndex: i,
      activeArray: trackConstructor(),
    });
  }
  return _isActiveArray;
};

//edit value function for isActive reducer

export const editValue = (trackIndex, padIndex, isActiveArray, newValue) => {
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




//function for play button
export const playTargetPlayer = (player) => {
  if (player.state === "started") {
    player.stop();
  }
  player.start();
};



//functions for recording reducer

export const targetRecsConstructor = () => {
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

export const activeRecsConstructor = () => {
  let _activeRecsArray = [];
  for (var i = 0; i < 4; i++) {
    _activeRecsArray.push({
      trackIndex: i,
      recordings: [],
    });
  }
  return _activeRecsArray;
};