import pluginJs from '@eslint/js';
import pluginStylistic from '@stylistic/eslint-plugin';
import pluginJsdoc from 'eslint-plugin-jsdoc';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

const configReact = pluginReact.configs.flat.recommended;

export default [
    pluginJs.configs.recommended,
    pluginJsdoc.configs['flat/recommended-error'],
    pluginStylistic.configs.customize({
        indent: 4,
        semi: true,
        arrowParens: true,
        braceStyle: '1tbs',
    }),
    {
        files: ['*.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    }, {
        ...configReact,
        settings: {
            ...configReact.settings,
            react: {
                version: 'detect',
            },
        },
        files: ['src/**'],
        languageOptions: {
            ...configReact.languageOptions,
            globals: {
                ...globals.browser,
                __webpack_public_path__: 'readonly',
                module: 'readonly',
                require: 'readonly',
            },
        },
    },
];
