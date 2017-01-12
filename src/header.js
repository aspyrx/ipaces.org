import React from 'react';
import { Link } from 'react-router';

import Dropdown from '~/components/dropdown';
import styles from './header.less';

function Logo() {
    return <div className={styles.logo}>
        <Link to='/' activeOnlyWhenExact activeClassName={styles.active}>
            IPACES.org
        </Link>
    </div>;
}

function renderRoutes(routes, parent) {
    return routes.filter(route =>
        'title' in route
    ).map(({ routes: subRoutes, title, name }, i) => {
        const to = `${parent}/${name}`;
        if (subRoutes) {
            return <Dropdown
                key={i}
                className={styles.dropdown}
                openClass={styles.open}
                menuClass={styles.menu}
                buttonClass={styles.button}
                buttonText={title}
            >
                <Link
                    to={to}
                    activeOnlyWhenExact
                    activeClassName={styles.active}
                >
                    {title}
                </Link>
                {renderRoutes(subRoutes, to)}
            </Dropdown>;
        }

        return <Link
            to={to}
            key={i}
            activeOnlyWhenExact
            activeClassName={styles.active}
        >
            {title}
        </Link>;
    });
}

export default function Header({ routes }) {
    return <div className={styles.header}>
        <Logo />
        {renderRoutes(routes, '')}
    </div>;
}

const { arrayOf, shape, bool, string } = React.PropTypes;
Header.propTypes = {
    routes: arrayOf(shape({
        exactly: bool,
        name: string.isRequired,
        title: string,
        routes: arrayOf(shape({
            exactly: bool,
            name: string.isRequired,
            title: string
        }))
    }))
};

