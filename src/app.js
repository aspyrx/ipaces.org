import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import asyncComponent from '~/components/asyncComponent';
import NotFound from 'bundle-loader?lazy!~/components/NotFound';
import Spinner from '~/components/spinner';
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

const matches = routes.filter(({ path }) =>
    routesAvailable[path + '/index.js']
).map(({ path, ...props }, i) => {
    const loadModule = routesCtx(path + '/index.js');

    props.key = i;
    props.component = asyncComponent(loadModule, <Spinner />);

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
                <Miss component={asyncComponent(NotFound)} />
            </div>
        </div>
    </BrowserRouter>;
}

