const routes = [{
    name: '',
    path: './home.js'
}, {
    name: 'about',
    path: './about/index.js',
    title: 'About',
    routes: [{
        name: 'bylaws',
        path: './about/bylaws.js',
        title: 'Bylaws'
    }]
}, {
    name: 'members',
    path: './members.js',
    title: 'Members'
}, {
    name: 'events',
    path: './events.js',
    title: 'Events'
}];

function routesReducer(parent) {
    return (arr, route) => arr.concat(flattenRoute(route, parent));
}

function flattenRoute({ routes: subRoutes, name, ...route }, parent) {
    route.pattern = `${parent}/${name}`;

    return subRoutes
        ? subRoutes.reduce(routesReducer(route.pattern), [route])
        : route;
}

const routesFlat = routes.reduce(routesReducer(''), []);

export { routes as default, routesFlat };
