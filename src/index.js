/**
 * Entry point for the app.
 * @module src/index
 */

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from 'src/App';

const appDiv = document.createElement('div');

// check for CSS3 flexbox support
if (!('flex' in appDiv.style)) {
    setTimeout(() => window.alert(
        'Your browser does not appear to support CSS Flexbox. Certain parts of'
        + ' the website may not display correctly. Apologies for any'
        + ' inconvenience!',
    ), 0);
}

appDiv.id = 'app';
document.body.appendChild(appDiv);

const root = createRoot(appDiv);

/**
 * Starts the app by rendering it into the page.
 */
function start() {
    root.render(<App />);
}

start();

if (module.hot) {
    module.hot.accept('src/App', start);

    module.hot.dispose(() =>
        document.body.removeChild(appDiv),
    );
}
