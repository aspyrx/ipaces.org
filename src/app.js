import React from 'react';
import { BrowserRouter, Miss, Match } from 'react-router';
import classNames from 'classnames';

import asyncComponent from '~/components/asyncComponent';
import Spinner from '~/components/spinner';
import NotFound from 'bundle-loader?lazy!~/components/NotFound';
import Header from '~/header';
import styles from './app.less';
import routes, { routesFlat } from '~/routes';

const routesCtx = require.context(
    'bundle-loader?lazy!./routes',
    true,
    /\.js$/
);

const matches = routesFlat.map((route, i) => {
    const { path, pattern, ...props } = route;
    const loadModule = routesCtx(path);
    const component = asyncComponent(loadModule, <Spinner />);
    return <Match
        {...props}
        key={i}
        exactly pattern={pattern}
        component={component}
    />;
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
            <div className={classNames(styles.container, styles.footer)}>
                <p>Site design by <a href="https://szz.io">Stan Zhang</a></p>
            </div>
        </div>
    </BrowserRouter>;
}

