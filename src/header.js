import React from 'react';
import { Link } from 'react-router';

import styles from './header.less';

function Logo() {
    return <div className={styles.logo}>
        <Link to='/' activeOnlyWhenExact activeClassName={styles.active}>
            IPACES
        </Link>
    </div>;
}

export default function Header({ routes }) {
    return <div className={styles.header}>
        <Logo />
        <div className={styles.navigation}>
            {routes.filter(route =>
                'title' in route
            ).map(({ title, name }, i) =>
                <Link
                    key={i}
                    to={'/' + name}
                    activeClassName={styles.active}
                >
                    {title}
                </Link>
            )}
        </div>
    </div>;
}

const { arrayOf, shape, string, bool } = React.PropTypes;
Header.propTypes = {
    routes: arrayOf(shape({
        exactly: bool,
        name: string.isRequired,
        path: string.isRequired,
        title: string,
        routes: arrayOf(shape({
            exactly: bool,
            name: string.isRequired,
            path: string.isRequired,
            title: string,
            routes: arrayOf(shape({
                title: string
            }))
        }))
    }))
};

