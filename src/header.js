import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

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
                title={title}
                to={to}
                activeClassName={styles.active}
            >
                {renderRoutes(subRoutes, to)}
            </Dropdown>;
        }

        return <Link
            key={i}
            to={to}
            activeClassName={styles.active}
        >
            {title}
        </Link>;
    });
}

class Dropdown extends React.Component {
    constructor() {
        super();

        this.state = { open: false };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(({ open }) => ({ open: !open }));
    }

    render() {
        const { open } = this.state;
        const { to, title, children } = this.props;
        const classes = classNames(styles.dropdown, {
            [styles.open]: open
        });

        const menuClasses = classNames(styles.menu, {
            [styles.open]: open
        });

        return <span className={classes} onClick={this.toggle}>
            {title}
            <div className={menuClasses}>
                <Link to={to}>{title}</Link>
                {children}
            </div>
        </span>;
    }
}

const { arrayOf, shape, string, bool } = React.PropTypes;
Dropdown.propTypes = {
    to: string.isRequired,
    title: string.isRequired,
    children: React.PropTypes.node
};

export default function Header({ routes }) {
    return <div className={styles.header}>
        <Logo />
        <div className={styles.navigation}>
            {renderRoutes(routes, '')}
        </div>
    </div>;
}

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

