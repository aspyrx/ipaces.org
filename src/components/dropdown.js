import React from 'react';

import Modal from './modal.js';

export default class Dropdown extends Modal {
    render() {
        const { isOpen } = this.state;
        const { className, button, children } = this.props;
        const onClick = isOpen ? this.close : this.open;

        return <span className={className} onClick={onClick}>
            {React.cloneElement(button, { isOpen })}
            {React.cloneElement(children, { isOpen })}
        </span>;
    }
}

Dropdown.propTypes = Object.assign({}, Modal.propTypes);

