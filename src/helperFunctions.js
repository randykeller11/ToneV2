
  //convert transport position into nearest non decimal value
  export const quantizeTransportPosition = (transportValue) => {
    const position = transportValue.split(":");
    const lastDigit = position[2].split(".");
    const quantizedPosition = [position[0], position[1], lastDigit[0]].join(
      ":"
    );
    return quantizedPosition;
  };

  export const sortPadColorMap = (_trackMap) => {
    const sortedPads = [];
    const localPads = [..._trackMap];
    sortedPads.push(localPads.filter((player, index) => index < 4));
    sortedPads.push(
      localPads.filter((player, index) => index >= 4 && index < 8)
    );
    sortedPads.push(
      localPads.filter((player, index) => index >= 8 && index < 12)
    );
    sortedPads.push(
      localPads.filter((player, index) => index >= 12 && index < 16)
    );

    return sortedPads;
  };

