/**
 * Animated modal component.
 * @module src/Modal
 */

import React, {
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    arrayOf,
    bool,
    element,
    func,
    object,
    string,
} from 'prop-types';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

/**
 * React component that renders as its first child, or `null` if there are no
 * children in the `children` array.
 * @param {object} props - The component's props.
 * @param {React.ReactElement} props.children - The component's child.
 * @returns {React.ReactElement} The child.
 */
function FirstChild(props) {
    const { children } = props;
    return children[0] || null;
}

FirstChild.propTypes = {
    children: arrayOf(element).isRequired,
};

/**
 * Modal React component.
 * @param {object} props - The component's props.
 * @param {string?} props.className - Modal CSS class name.
 * @param {React.ReactElement} props.button - Modal-opening button.
 * @param {React.ReactElement} props.children - Modal contents.
 * @param {object?} props.transition - CSSTransition props.
 * @param {boolean?} props.noWindowHandler - If true, don't add a global window
 * handler for closing the modal.
 * @param {Function?} props.onClick - Modal click handler. Called with `(event,
 * { isOpen, open, close })`.
 * @returns {React.ReactElement} The component's elements.
 */
export default function Modal({
    className,
    button,
    children,
    transition,
    noWindowHandler,
    onClick,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const nodeRef = useRef(null);

    /**
     * Opens the modal.
     * @param {Event} [event] - If an event is passed, its propagation is
     * stopped.
     */
    function open(event) {
        event && event.stopPropagation();
        setIsOpen(true);
    }

    /**
     * Closes the modal.
     */
    function close() {
        setIsOpen(false);
    }

    useEffect(() => {
        if (noWindowHandler || !isOpen) {
            return;
        }

        window.addEventListener('click', close);
        return () => {
            window.removeEventListener('click', close);
        };
    }, [noWindowHandler, isOpen]);

    let modal;
    if (isOpen) {
        modal = React.cloneElement(children, {
            isOpen, close, ref: nodeRef,
        });

        if (transition) {
            modal = (
                <CSSTransition
                    nodeRef={nodeRef}
                    key={isOpen}
                    {...transition}
                >
                    {modal}
                </CSSTransition>
            );
        }
    } else {
        modal = null;
    }

    if (transition) {
        modal = (
            <TransitionGroup component={FirstChild}>
                {modal}
            </TransitionGroup>
        );
    }

    const modalButton = React.cloneElement(button, {
        isOpen, open,
    });

    let modalOnClick = null;
    if (onClick) {
        modalOnClick = function modalOnClick(event) {
            return onClick(event, { isOpen, open, close });
        };
    }

    return (
        <span className={className} onClick={modalOnClick}>
            {modalButton}
            {modal}
        </span>
    );
}

Modal.propTypes = {
    className: string,
    button: element.isRequired,
    children: element.isRequired,
    transition: object,
    noWindowHandler: bool,
    onClick: func,
};
