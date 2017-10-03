/**
 * Static route configuration for the app.
 *
 * @module src/routeConfig
 */

import { string, shape, object, objectOf } from 'prop-types';

import asyncComponent from 'src/async-component';
import Spinner from 'src/Spinner';

/**
 * Route configuration object.
 *
 * @typedef {Object} Route
 * @property {string} title - The route's title. Used for labels/link text.
 * @property {string} path - The full path for the route.
 * @property {string[]} parts - The individual parts of the path.
 * @property {module:src/routeConfig~Children} children - The child routes.
 * @property {Function} component - The React component for the route.
 */

/**
 * Child route configuration object. Each key is the next path component.
 *
 * @typedef {Object<string, module:src/routeConfig~Route>} Children
 */

const routeConfigCtx = require.context(
    './routes',
    true,
    /\/route.json$/
);

const routeComponentCtx = require.context(
    'bundle-loader?lazy!./routes',
    true,
    /\/index.(js|md)$/
);

const routeConfig = { children: {} };

/**
 * Configures the route specified by the given configuration file.
 *
 * @param {string} configPath - Path to the configuration file.
 * @returns {module:src/routeConfig~Route} The configured route.
 */
function configure(configPath) {
    const { title } = routeConfigCtx(configPath);
    const path = configPath.match(/.(\/|\/.*\/)route.json$/)[1];

    let getComponent;
    try {
        getComponent = routeComponentCtx(`.${path}index.js`);
    } catch (err) {
        getComponent = routeComponentCtx(`.${path}index.md`);
    }
    const component = asyncComponent(getComponent, Spinner);

    // Find the route's proper location in the configuration
    const parts = path.split('/').slice(1, -1);
    const route = parts.reduce((node, key) => {
        if (!(key in node.children)) {
            // Pre-configure empty node
            node.children[key] = { children: {} };
        }

        return node.children[key];
    }, routeConfig);

    route.title = title;
    route.path = path;
    route.component = component;
    route.parts = parts;
    return route;
}

const routeConfigFlat = routeConfigCtx.keys()
    .map(configure)
    .sort((a, b) => b.parts.length - a.parts.length);

const routeShape = shape({
    title: string.isRequired,
    path: string.isRequired,
    children: object.isRequired
});

const routeChildrenShape = objectOf(routeShape);

export {
    /**
     * Top-level route configuration.
     *
     * @type {module:src/routeConfig~Route}
     */
    routeConfig as default,
    /**
     * A list of all configured routes, sorted from most to least specific.
     *
     * @type {module:src/routeConfig~Route[]}
     */
    routeConfigFlat,
    /**
     * Validator for `Route` in props.
     *
     * @type {Function}
     */
    routeShape,
    /**
     * Validator for `Children` in props.
     *
     * @type {Function}
     */
    routeChildrenShape
};

