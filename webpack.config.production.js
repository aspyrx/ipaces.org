import webpackConfigBase from './webpack.config.base.js';

const publicPath = '/';

/**
 * @returns {object} Production webpack configuration.
 */
export default function webpackConfigProduction() {
    const config = webpackConfigBase();

    config.output.publicPath = publicPath;

    if (!config.module) {
        config.module = {};
    }

    config.mode = 'production';

    if (!config.plugins) {
        config.plugins = [];
    }

    return config;
}
