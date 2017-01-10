import React from 'react';

const routes = [{
    exactly: true,
    pattern: '/',
    path: './home'
}, {
    pattern: '/about',
    path: './about',
    title: 'About'
}, {
    pattern: '/members',
    path: './members',
    title: 'Members'
}, {
    pattern: '/events',
    path: './events',
    title: 'Events'
}, {
    pattern: '/foo',
    path: './foo',
    title: 'Foo'
}];

const { arrayOf, shape, string, bool } = React.PropTypes;
const routesShape = arrayOf(shape({
    exactly: bool,
    pattern: string.isRequired,
    path: string.isRequired,
    title: string
}));

export { routes as default, routesShape };

