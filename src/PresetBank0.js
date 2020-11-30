import React, {useState} from 'react';
import PlayPads from './PlayPads';
import useBank0Players from './useBank0Players';

export const presetBankData = React.createContext();

function PresetBank0({snapMode, isRecording}) {
    const [players, loading] = useBank0Players();
    const [currentTrack, setCurrentTrack] = useState(0);

    const contextValue = {
        players,
        snapMode,
        isRecording,
    }

    return (
        <div className="presetBank">
            <presetBankData.Provider value={contextValue}>
                {loading ? <h1>loading</h1> : <PlayPads currentTrack={currentTrack}/>}
            </presetBankData.Provider>
        </div>
    );
}

export default PresetBank0;
