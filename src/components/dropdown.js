import React from 'react';

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
        const { className, button, children } = this.props;
        const onClick = open ? this.close : this.open;

        return <span className={className} onClick={onClick}>
            {React.cloneElement(button, { open })}
            {React.cloneElement(children, { open })}
        </span>;
    }
}

const { string, element } = React.PropTypes;
Dropdown.propTypes = {
    className: string,
    button: element.isRequired,
    children: element.isRequired
};

