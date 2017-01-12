import React from 'react';
import classNames from 'classnames';

export default class Dropdown extends React.Component {
    constructor() {
        super();

        this.state = { open: false };
        this.toggle = this.toggle.bind(this);
    }

    toggle(event) {
        event.stopPropagation();

        const { open } = this.state;
        window[
            `${open ? 'remove' : 'add'}EventListener`
        ]('click', this.toggle);
        this.setState({ open: !open });
    }

    componentWillUnmount() {
        if (this.state.open) {
            window.removeEventListener('click', this.toggle);
        }
    }

    render() {
        const { open } = this.state;
        const {
            className, openClass, buttonClass, menuClass,
            buttonText, children
        } = this.props;
        const classes = classNames(className, {
            [openClass]: open
        });

        return <span className={classes} onClick={this.toggle}>
            <span className={buttonClass}>
                {buttonText}
            </span>
            <div className={menuClass}>
                {children}
            </div>
        </span>;
    }
}

const { string, node } = React.PropTypes;
Dropdown.propTypes = {
    className: string,
    openClass: string,
    menuClass: string,
    buttonClass: string,
    buttonText: string,
    children: node
};

