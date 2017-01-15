import React from 'react';

import Modal from './modal.js';

export default class Dropdown extends Modal {
    render() {
        const onClick = this.state.isOpen ? this.close : this.open;
        return React.cloneElement(super.render(), { onClick });
    }
}

Dropdown.propTypes = Object.assign({}, Modal.propTypes);

