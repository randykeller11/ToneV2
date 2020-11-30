import React, {useState} from 'react';
import PlayPads from './PlayPads';
import TrackToggle from './TrackToggle';

function PlayMode() {
    const [currentTrack, setCurrentTrack] = useState(0);

    return (
        <div>
            <PlayPads currentTrack={currentTrack}/>
            <TrackToggle currentTrack={currentTrack} setCurrentTrack={setCurrentTrack}/>
        </div>
    );
}

export default PlayMode;
