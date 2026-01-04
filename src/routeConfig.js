/**
 * Static route configuration for the app.
 * @module src/routeConfig
 */
import React from 'react';

import { string, shape, object, objectOf } from 'prop-types';

import asyncComponent from 'src/async-component';
import Spinner from 'src/Spinner';

/**
 * Route configuration object.
 * @typedef {object} Route
 * @property {string} title - The route's title. Used for labels/link text.
 * @property {string} path - The full path for the route.
 * @property {string[]} parts - The individual parts of the path.
 * @property {module:src/routeConfig~Children} children - The child routes.
 * @property {Function} component - The React component for the route.
 */

/**
 * Child route configuration object. Each key is the next path component.
 * @typedef {{[arc: string]: module:src/routeConfig~Route}} Children
 */

const routeConfigCtx = import.meta.webpackContext(
    './routes', {
        recursive: true,
        include: /\/route.json$/,
    },
);

const routeComponentCtx = import.meta.webpackContext(
    './routes', {
        recursive: true,
        include: /\/index.(js|md)$/,
    },
);

const routeConfig = { children: {} };

/**
 * Configures the route specified by the given configuration file.
 * @param {string} configPath - Path to the configuration file.
 * @returns {module:src/routeConfig~Route} The configured route.
 */
function configure(configPath) {
    const { title } = routeConfigCtx(configPath);
    const path = configPath.match(/.(\/|\/.*\/)route.json$/)[1];

    /**
     * Callback for retrieving the component.
     * @returns {React.Component} The component.
     */
    function getModule() {
        try {
            return routeComponentCtx(`.${path}index.js`);
        } catch (err) {
            void err;
            return routeComponentCtx(`.${path}index.md`);
        }
    }
    const Component = asyncComponent(getModule, Spinner);

    // Find the route's proper location in the configuration
    const parts = path.split('/').slice(1, -1);
    const route = parts.reduce((node, key) => {
        if (!(key in node.children)) {
            // Pre-configure empty node
            node.children[key] = { children: {} };
        }

        return node.children[key];
    }, routeConfig);

    const titleText = `${title} | IPACES.org | 国际华人地球科学家协会`;
    route.title = title;
    route.path = path;
    route.component = function () {
        return (
            <>
                <title>{titleText}</title>
                <Component />
            </>
        );
    };
    route.parts = parts;
    return route;
}

const routeConfigFlat = routeConfigCtx.keys()
    .map(configure)
    .sort((a, b) => b.parts.length - a.parts.length);

const routeShape = shape({
    title: string.isRequired,
    path: string.isRequired,
    children: object.isRequired,
});

const routeChildrenShape = objectOf(routeShape);

export {
    /**
     * Top-level route configuration.
     * @type {module:src/routeConfig~Route}
     */
    routeConfig as default,
    /**
     * A list of all configured routes, sorted from most to least specific.
     * @type {module:src/routeConfig~Route[]}
     */
    routeConfigFlat,
    /**
     * Validator for `Route` in props.
     * @type {Function}
     */
    routeShape,
    /**
     * Validator for `Children` in props.
     * @type {Function}
     */
    routeChildrenShape,
};
