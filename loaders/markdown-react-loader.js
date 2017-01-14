'use strict';

const marked = require('marked');

/**
 * Webpack loader for converting markdown into a stateless React component.
 *
 * The markdown is wrapped with a `div` tag with class `markdown`.
 *
 * @param {string} content - The markdown to convert.
 * @returns {void}
 */
module.exports = function loader(content) {
    this.cacheable();

    const done = this.async();
    if (!done) {
        return;
    }

    marked(content, (err, html) => {
        if (err) {
            return done(err);
        }

        html = html.replace(/\n/g, '\\n');
        const result = `var React = require('react');

module.exports.default = function() {
    return React.createElement('div', {
        className: 'markdown',
        dangerouslySetInnerHTML: {
            __html: '${html}'
        }
    });
}
`;
        done(null, result);
    });
};

