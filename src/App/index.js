/**
 * Main app module.
 * @module src/App
 */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Spinner from 'src/Spinner';
import asyncComponent from 'src/async-component';
import { routeConfigFlat } from 'src/routeConfig';

import Header from 'src/App/Header';
import Footer from 'src/App/Footer';

import * as styles from './index.less';

const routes = routeConfigFlat.map((config, i) => {
    const { path, component } = config;
    return (
        <Route
            key={i}
            path={path}
            exact={path === '/'}
            strict
            component={component}
        />
    );
});

/**
 * React component for the entire app.
 * @returns {React.ReactElement} The app's elements.
 */
export default function App() {
    const NotFound = asyncComponent(() => import('src/NotFound'), Spinner);
    return (
        <BrowserRouter basename={__webpack_public_path__}>
            <Header />
            <main className={styles.container}>
                <Switch>
                    { routes }
                    <Route component={NotFound} />
                </Switch>
            </main>
            <Footer />
        </BrowserRouter>
    );
}
