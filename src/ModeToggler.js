import React, {useContext} from 'react';
import './ModeToggler.css';
import { dataLayer } from "./App";





function ModeToggler({arrange, player}) {
    const { setGameState } = useContext(dataLayer);

    return (
        <div className="donut__ModeToggler">
            <button onClick={()=>setGameState(2)}>🎹</button>
            <button onClick={()=>setGameState(3)}>🎼</button>
            <button>🔊</button>


        </div>
    );
}

export default ModeToggler;
