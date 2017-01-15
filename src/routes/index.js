const routes = [{
    name: '',
    path: './home.js'
}, {
    name: 'about',
    path: './about/index.md',
    title: 'About',
    routes: [{
        name: 'bylaws',
        path: './about/bylaws.md',
        title: 'Bylaws'
    }]
}, {
    name: 'members',
    path: './members/index.js',
    title: 'Members'
}, {
    name: 'events',
    path: './events/index.js',
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

