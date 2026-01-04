/**
 * Site-wide header component.
 * @module src/App/Header
 */

import React, {
    useState,
} from 'react';
import {
    bool, string, object,
} from 'prop-types';
import { Route, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import routeConfig, { routeChildrenShape } from 'src/routeConfig';
import Dropdown from 'src/Dropdown';
import * as styles from './index.less';

/**
 * Checks if the object has no `own` properties.
 * @param {object} obj - The object to check.
 * @returns {boolean} `true` if the object has no `own` properties; `false`
 * otherwise.
 */
function objectIsEmpty(obj) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }

    return true;
}

/**
 * Logo React component.
 * @param {object} props - The object's props.
 * @param {string?} props.className - CSS class(es) for the logo.
 * @param {string?} props.to - The logo's target path.
 * @returns {React.ReactElement} The component's elements.
 */
function Logo({ className, to }) {
    className = classNames(styles.logo, className);

    const logoElems = (
        <>
            <div className={styles.image} />
            <div className={styles.text}>
                <div>国际华人地球科学家协会</div>
                <div>IPACES.org</div>
            </div>
        </>
    );

    if (!to) {
        return (
            <div className={className}>
                {logoElems}
            </div>
        );
    }

    return (
        <NavLink
            to={to}
            exact
            className={className}
            activeClassName={styles.active}
        >
            {logoElems}
        </NavLink>
    );
}

Logo.propTypes = {
    className: string,
    to: string,
};

/**
 * Header link React component.
 * @param {object} props - The component's props. Will be spread onto a
 * `NavLink`.
 * @returns {React.ReactElement} The component's elements.
 */
function HeaderLink(props) {
    return (
        <NavLink
            activeClassName={styles.active}
            {...props}
        />
    );
}

/**
 * Dropdown button React component.
 * @param {object} props - The component's props.
 * @param {string} props.to - The dropdown's target path. Used for routing.
 * @param {string} props.title - The title for the dropdown.
 * @param {boolean} props.isOpen - Whether or not the dropdown is open.
 * @returns {React.ReactElement} The component's elements.
 */
function DropdownButton(props) {
    const { to, title, isOpen } = props;

    /**
     * Button React component.
     * @param {object} buttonProps - The component's props.
     * @param {boolean} buttonProps.match - Whether or not the target path has
     * been matched.
     * @returns {React.ReactElement} The component's elements.
     */
    function Button(buttonProps) {
        const { match } = buttonProps;
        const classes = classNames(styles.button, {
            [styles.active]: match !== null,
            [styles.open]: isOpen,
        });

        return <span className={classes}>{title}</span>;
    }

    Button.propTypes = {
        match: object,
    };

    return (
        <Route path={to}>
            {Button}
        </Route>
    );
}

DropdownButton.propTypes = {
    to: string.isRequired,
    title: string.isRequired,
    isOpen: bool,
};

/**
 * Dropdown menu React component.
 * @param {object} props - The component's props.
 * @param {string} props.to - The dropdown's target path. Used for routing.
 * @param {string} props.title - The title for the dropdown.
 * @param {object} props.ref - Ref for the menu's DOM element.
 * @param {module:src/routeConfig~Children} props.routeChildren - Child routes.
 * @returns {React.ReactElement} The component's elements.
 */
function DropdownMenu({ to, title, routeChildren, ref }) {
    return (
        <div className={styles.menu} ref={ref}>
            <HeaderLink exact to={to}>{title}</HeaderLink>
            {routeChildrenMenu(routeChildren)}
        </div>
    );
}

DropdownMenu.propTypes = {
    to: string.isRequired,
    title: string.isRequired,
    routeChildren: routeChildrenShape.isRequired,
    ref: object,
};

/**
 * Renders a menu for selecting a child route.
 * @param {module:src/routeConfig~Children} routeChildren - The child routes.
 * @returns {React.ReactElement[]} The menu's elements.
 */
function routeChildrenMenu(routeChildren) {
    return Object.keys(routeChildren).map((name) => {
        const { children: grandchildren, title, path } = routeChildren[name];

        if (objectIsEmpty(grandchildren)) {
            return (
                <HeaderLink
                    key={path}
                    to={path}
                >
                    {title}
                </HeaderLink>
            );
        }

        const button = (
            <DropdownButton
                to={path}
                title={title}
            />
        );

        const { enter, enterActive, exit, exitActive } = styles;

        return (
            <Dropdown
                key={path}
                className={styles.dropdown}
                button={button}
                transition={{
                    appear: true,
                    classNames: {
                        enter, enterActive, exit, exitActive,
                        appear: enter,
                        appearActive: enterActive,
                    },
                    timeout: 300,
                }}
            >
                <DropdownMenu
                    to={path}
                    title={title}
                    routeChildren={grandchildren}
                />
            </Dropdown>
        );
    });
}

/**
 * Header React component.
 * @returns {React.ReactElement} The component's elements.
 */
export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Toggle event handler.
     */
    function toggle() {
        setIsOpen(!isOpen);
    }

    const classes = classNames(styles.header, {
        [styles.open]: isOpen,
    });

    return (
        <header className={classes} onClick={toggle}>
            <Logo className={styles.toggle} />
            <nav>
                <Logo to="/" />
                <HeaderLink to="/" exact className={styles.homeLink}>
                    Home
                </HeaderLink>
                {routeChildrenMenu(routeConfig.children)}
            </nav>
        </header>
    );
}
