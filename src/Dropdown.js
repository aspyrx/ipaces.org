/**
 * Animated dropdown component. Implemented as a modal that closes itself once
 * it is clicked.
 * @module src/Dropdown
 */

import React from 'react';

import Modal from 'src/Modal';

/**
 * Dropdown React component.
 * @param {object} props - The component's props.
 * @returns {React.ReactElement} The component's elements.
 */
export default function Dropdown(props) {
    /**
     * Modal click handler.
     * @param {Event} event - The click event.
     * @param {object} args - Modal event args.
     * @param {boolean} args.isOpen - True if the modal is open.
     * @param {Function} args.open - Callback for opening the modal.
     * @param {Function} args.close - Callback for closing the modal.
     */
    function onClick(event, {
        isOpen,
        open,
        close,
    }) {
        isOpen ? close(event) : open(event);
    }

    return <Modal onClick={onClick} {...props} />;
}
