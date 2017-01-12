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
        const { className, openClass, button, children } = this.props;
        const classes = classNames(className, {
            [openClass]: open
        });

        return <span className={classes} onClick={this.toggle}>
            {button}
            {children}
        </span>;
    }
}

const { string, element } = React.PropTypes;
Dropdown.propTypes = {
    className: string,
    openClass: string,
    button: element.isRequired,
    children: element.isRequired
};

