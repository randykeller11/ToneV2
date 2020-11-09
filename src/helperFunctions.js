import React from 'react';
import * as Tone from 'tone';


function helperFunctions() {

    const quantizeTransportPosition = (transportValue) => {
        const position = transportValue.split(':');
        const lastDigit = position[2].split('.');
        const quantizedPosition = [position[0], position[1], lastDigit[0]].join(':');
        return quantizedPosition;
      } 


    return quantizeTransportPosition
}

export default helperFunctions
