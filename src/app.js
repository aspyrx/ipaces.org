import React from 'react';
import { BrowserRouter, Match } from 'react-router';

import asyncComponent from '~/components/asyncComponent';
import Header from '~/header';
import styles from './app.less';
import routes from '~/routes';

const routesCtx = require.context(
    'bundle-loader?lazy!./routes',
    true,
    /\.\/.+?\/index.js/
);

const routesAvailable = Object.create(null);
routesCtx.keys().forEach(key => (routesAvailable[key] = true));

function routeLoader(path) {
    return function loadRoute(done) {
        if (!routesAvailable[path + '/index.js']) {
            return done(new Error(`Unknown route ${path}`));
        }

        const loadModule = routesCtx(path + '/index.js');
        return loadModule(module =>
            done(null, module.default)
        );
    };
}

const matches = routes.map(({ path, ...props }, i) => {
    props.key = i;
    props.component = asyncComponent(routeLoader(path));

    return <Match {...props} />;
});

export default function App() {
    return <BrowserRouter>
        <div className={styles.containers}>
            <div className={styles.container}>
                <Header routes={routes} />
            </div>
            <div className={styles.container}>
                { matches }
            </div>
        </div>
    </BrowserRouter>;
}

