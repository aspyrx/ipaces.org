import React from 'react';

const routes = [{
    exactly: true,
    pattern: '/',
    path: './home'
}, {
    pattern: '/about',
    path: './about',
    nav: {
        title: 'About'
    }
}, {
    pattern: '/members',
    path: './members',
    nav: {
        title: 'Members'
    }
}, {
    pattern: '/events',
    path: './events',
    nav: {
        title: 'Events'
    }
}, {
    pattern: '/foo',
    path: './foo',
    nav: {
        title: 'Foo'
    }
}];

const { arrayOf, shape, string, bool } = React.PropTypes;
const routesShape = arrayOf(shape({
    exactly: bool,
    pattern: string.isRequired,
    path: string.isRequired,
    nav: shape({
        title: string.isRequired
    })
}));

export { routes as default, routesShape };

