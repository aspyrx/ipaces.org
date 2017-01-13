import React from 'react';
import classNames from 'classnames';

export default class Dropdown extends React.Component {
    constructor() {
        super();

        this.state = { open: false };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open(event) {
        event.stopPropagation();

        this.setState({ open: true }, () => {
            window.addEventListener('click', this.close);
        });
    }

    close() {
        window.removeEventListener('click', this.close);
        this.setState({ open: false });
    }

    componentWillUnmount() {
        if (this.state.open) {
            window.removeEventListener('click', this.close);
        }
    }

    render() {
        const { open } = this.state;
        const { className, openClass, button, children } = this.props;
        const classes = classNames(className, {
            [openClass]: open
        });
        const onClick = open ? this.close : this.open;

        return <span className={classes} onClick={onClick}>
            <span>{React.cloneElement(button, { open })}</span>
            {React.cloneElement(children, { open })}
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

