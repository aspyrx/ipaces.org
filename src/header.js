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

        if (!subRoutes) {
            return React.cloneElement(link, {
                key: i
            });
        }

        function getChild(isOpen) {
            function Child({ isActive }) {
                const classes = classNames(styles.button, {
                    [styles.active]: isActive,
                    [styles.open]: isOpen
                });

                const onClick = event => event.preventDefault();

                return <a className={classes} href='' onClick={onClick}>
                    {title}
                </a>;
            }

            Child.propTypes = {
                isActive: React.PropTypes.bool
            };

            return Child;
        }

        function DropdownButton({ isOpen }) {
            return React.cloneElement(link, {
                activeOnlyWhenExact: false,
                children: getChild(isOpen)
            });
        }

        DropdownButton.propTypes = {
            isOpen: React.PropTypes.bool
        };

        function DropdownMenu({ isOpen }) {
            const classes = classNames(styles.menu, {
                [styles.open]: isOpen
            });

            return <div className={classes}>
                {link}
                {renderRoutes(subRoutes, to)}
            </div>;
        }

        DropdownMenu.propTypes = {
            isOpen: React.PropTypes.bool
        };

        return <Dropdown
            key={i}
            className={styles.dropdown}
            button={<DropdownButton />}
        >
            <DropdownMenu />
        </Dropdown>;
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

