import webpackConfigDefault from './webpack.config.js';

/**
 * @returns {object} Live webpack configuration.
 */
export default function webpackConfigLive() {
    const config = webpackConfigDefault();

    config.output.filename = '[name].js';

    config.entry.main.import.unshift(
        'webpack-dev-server/client?http://localhost:8080/',
        'webpack/hot/dev-server',
    );

    if (!config.optimization) {
        config.optimization = {};
    }

    config.optimization.runtimeChunk = 'single';
    config.optimization.moduleIds = 'named';

    return config;
}
