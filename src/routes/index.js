const routeConfig = [{
    name: '',
    path: './home.js'
}, {
    name: 'about',
    path: './about/index.md',
    title: 'About',
    routeConfig: [{
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

function configReducer(parent) {
    return (arr, config) => arr.concat(flattenConfig(config, parent));
}

function flattenConfig({ routeConfig: subRoutes, name, ...config }, parent) {
    config.pattern = `${parent}/${name}`;

    return subRoutes
        ? subRoutes.reduce(configReducer(config.pattern), [config])
        : config;
}

const routeConfigFlat = routeConfig.reduce(configReducer(''), []);

export { routeConfig as default, routeConfigFlat };

