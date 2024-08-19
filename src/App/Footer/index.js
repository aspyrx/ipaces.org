/**
 * Site-wide footer component.
 * @module src/App/Footer
 */

import React from 'react';
import { Link } from 'react-router-dom';

import routeConfig from 'src/routeConfig';
import * as styles from './index.less';

/**
 * Footer React component.
 * @returns {React.ReactElement} The component's elements.
 */
export default function Footer() {
    const links = Object.keys(routeConfig.children)
        .map((name) => {
            const { title, path } = routeConfig.children[name];
            return <Link key={path} to={path}>{title}</Link>;
        });

    const { title, path } = routeConfig;

    return (
        <footer className={styles.footer}>
            <nav>
                <div className={styles.left}>
                    <Link to={path}>{title}</Link>
                    {links}
                </div>
                <div className={styles.right}>
                    <a href="mailto:ipacesweb@gmail.com">
                        Contact the webmaster
                    </a>
                    <span>
                        Site design by
                        {' '}
                        <a href="https://szz.io">Stan Zhang</a>
                    </span>
                </div>
            </nav>
        </footer>
    );
}
