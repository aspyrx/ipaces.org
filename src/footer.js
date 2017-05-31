import React from 'react';
import { object, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './footer.less';

export default function Footer({ routeConfig }) {
    const links = Object.keys(routeConfig.children)
        .map((name, i) => {
            const { title } = routeConfig.children[name];
            return <Link key={i} to={`/${name}/`}>{title}</Link>;
        });

    return <div className={styles.footer}>
        <div className={styles.navigation}>
            <Link to='/'>Home</Link>
            {links}
            <div className={styles.right}>
                <span>
                    <a href="mailto:ipacesweb@gmail.com">
                        Contact the webmaster
                    </a>
                </span>
                <span>
                    Site design by <a href="https://szz.io">Stan Zhang</a>
                </span>
            </div>
        </div>
    </div>;
}

Footer.propTypes = {
    routeConfig: shape({
        path: string.isRequired,
        title: string.isRequired,
        children: object.isRequired
    })
};

