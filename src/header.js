import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

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
        const link = <Link
            to={to}
            activeOnlyWhenExact
            activeClassName={styles.active}
        >
            {title}
        </Link>;

        if (subRoutes) {
            const children = ({ isActive }) => {
                const classes = classNames(styles.button, {
                    [styles.active]: isActive
                });

                const onClick = event => event.preventDefault();

                return <a className={classes} href='' onClick={onClick}>
                    {title}
                </a>;
            };

            children.propTypes = {
                isActive: React.PropTypes.bool
            };

            const button = React.cloneElement(link, {
                activeOnlyWhenExact: false,
                children
            });

            return <Dropdown
                key={i}
                className={styles.dropdown}
                openClass={styles.open}
                button={button}
            >
                <div className={styles.menu}>
                    {link}
                    {renderRoutes(subRoutes, to)}
                </div>
            </Dropdown>;
        }

        return React.cloneElement(link, {
            key: i
        });
    });
}

export default function Header({ routes }) {
    return <div className={styles.header}>
        <div className={styles.navigation}>
            <Logo />
            {renderRoutes(routes, '')}
        </div>
    </div>;
}

const { arrayOf, shape, string } = React.PropTypes;
Header.propTypes = {
    routes: arrayOf(shape({
        name: string.isRequired,
        title: string,
        routes: arrayOf(shape({
            name: string.isRequired,
            title: string
        }))
    }))
};

