import React from 'react';
import PlayPads from './PlayPads';
import useBank0Players from './useBank0Players';

export const presetBankData = React.createContext();

function PresetBank0({snapMode, isRecording}) {
    const [players, loading] = useBank0Players();

    const contextValue = {
        players: players,
        snapMode: snapMode,
        isRecording: isRecording,
    }

    return (
        <div className="presetBank">
            <presetBankData.Provider value={contextValue}>
                {loading ? <h1>loading</h1> : <PlayPads/>}
            </presetBankData.Provider>
        </div>
    );
}

export default PresetBank0;
