import React, {useContext} from 'react';

import {practiceContext} from './app';

function ContextTest() {
    const msg = useContext(practiceContext);

    return (
        <div>
            <h1>hello</h1>
            
        </div>
    );
}

export default ContextTest;
