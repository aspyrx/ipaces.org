import React from 'react';

export default function asyncComponent(getComponent) {
    let cached = null;

    return class AsyncComponent extends React.Component {
        constructor() {
            super();

            this.state = { Component: cached };
        }

        componentWillMount() {
            if (this.state.Component) {
                return;
            }

            getComponent((err, Component) => {
                if (err) {
                    console.error(err);
                    Component = () => <div><h1>404</h1></div>;
                }

                cached = Component;
                this.setState({ Component });
            });
        }

        render() {
            const { Component } = this.state;
            return Component ? <Component {...this.props} /> : null;
        }
    };
}

