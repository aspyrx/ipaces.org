import React from 'react';
import { Link } from 'react-router';

import { routesShape } from '~/routes';

import styles from './header.less';

function Logo() {
    return <div className={styles.logo}>
        <span>Hello React!</span>
    </div>;
}

export default function Header({ routes }) {
    return <div className={styles.header}>
        <Link to='/'><Logo /></Link>
        <div className={styles.navigation}>
            {routes.filter(route =>
                'title' in route
            ).map(({ title, exactly, pattern }, i) =>
                <Link
                    key={i}
                    to={pattern}
                    activeOnlyWhenExact={exactly}
                    activeClassName={styles.active}
                >
                    {title}
                </Link>
            )}
        </div>
    </div>;
}

Header.propTypes = {
    routes: routesShape
};

