import path from 'node:path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const ctxDir = path.resolve(import.meta.dirname);
const libDir = path.resolve(ctxDir, 'lib');
const srcDir = path.resolve(ctxDir, 'src');
const loadersDir = path.resolve(ctxDir, 'loaders');
const publicDir = path.resolve(ctxDir, 'public');
const outDir = path.resolve(ctxDir, 'dist');

const publicPath = '/';

/**
 * @returns {object} Base webpack configuration.
 */
export default function webpackConfigBase() {
    return {
        mode: 'development',
        devtool: 'cheap-module-source-map',
        context: ctxDir,
        entry: {
            lib: [
                'react', 'react-dom',
                'react-router', 'react-router-dom',
            ],
            main: {
                import: ['normalize.css', srcDir],
                dependOn: ['lib'],
            },
        },
        output: {
            clean: true,
            path: outDir,
            publicPath,
            filename: '[name].[chunkhash].js',
        },
        resolve: {
            alias: {
                lib: libDir,
                src: srcDir,
                public: publicDir,
            },
        },
        resolveLoader: {
            alias: {
                '>': loadersDir,
            },
        },
        module: {
            rules: [{
                include: [publicDir],
                use: [{
                    loader: '>/public-loader',
                    options: {
                        publicPath,
                        publicDir,
                    },
                }],
            }, {
                test: /\.css$/,
                include: [/node_modules/],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            }, {
                test: /\.less$/,
                include: [srcDir],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]-[hash:base64:5]',
                            },
                            url: false,
                        },
                    },
                    'postcss-loader',
                    'less-loader',
                ],
            }, {
                test: /\.js$/,
                include: [
                    libDir,
                    srcDir,
                    // https://github.com/webpack/loader-utils/issues/92
                    /node_modules\/loader-utils/,
                ],
                use: [{
                    loader: 'babel-loader',
                }],
            }, {
                test: /\.md$/,
                use: [{
                    loader: '>/markdown-react-loader',
                }],
            }, {
                test: /\.csv$/,
                use: [{
                    loader: 'csv-loader',
                    options: {
                        delimiter: ',',
                        newline: '\n',
                        header: true,
                        skipEmptyLines: true,
                    },
                }],
            }, {
                test: /\.(eot|woff|ttf|svg|jpg|png|ico)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                    },
                }],
            }],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
            }),
            // SPA 404 redirect.
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                filename: '404.html',
            }),
            new ESLintPlugin({
                configType: 'flat',
            }),
        ],
    };
}
