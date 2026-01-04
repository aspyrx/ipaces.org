/**
 * Implements a React component for wrapping functions that asynchronously load
 * React components.
 * @module src/async-component
 */

import React from 'react';

/**
 * Function that asynchronously fetches a React component module.
 * @callback getModule
 * @returns {Promise} Resolves with the component's module, whose default export
 * is the React component.
 */

/**
 * Creates a React component that uses the given function to retrieve the actual
 * component's module to render only when the returned component is first
 * mounted.
 *
 * Designed for usage with webpack dynamic `import()`.
 * @param {module:src/async-component~getModule} getModule - Function to use to
 * fetch the commponent's module.
 * @param {Function} [Placeholder] - React component used as a
 * placeholder while the component is still loading.
 * @returns {module:src/async-component~AsyncComponent} React component that
 * renders as the placeholder until the component loads, at which point it is
 * replaced by the actual component.
 */
export default function asyncComponent(
    getModule, Placeholder = () => null,
) {
    let cached = null;

    /**
     * The wrapper component.
     */
    class AsyncComponent extends React.Component {
        /**
         * Initializes the wrapper component.
         */
        constructor() {
            super();

            this.state = { Component: cached };
        }

        /**
         * React lifecycle handler called when the component has mounted.
         */
        async componentDidMount() {
            if (this.state.Component) {
                return;
            }

            const module = await getModule();
            cached = module.default;
            this.setState({ Component: cached });
        }

        /**
         * Renders the component.
         * @returns {React.ReactElement} The loaded component rendered with the
         * given props, or the placeholder if the component hasn't loaded yet.
         */
        render() {
            const { Component } = this.state;

            return Component
                ? <Component {...this.props} />
                : <Placeholder {...this.props} />;
        }
    }

    return AsyncComponent;
}
