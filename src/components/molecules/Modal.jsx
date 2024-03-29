import 'core-js/es6/string';
import 'core-js/es6/object';
import 'core-js/es7/object';
import 'core-js/es6/array';
import 'core-js/es7/array';
import 'core-js/es6/set';
import 'core-js/es7/set';
import 'core-js/modules/es6.regexp.constructor';
import React from 'react';
import PropTypes from 'prop-types';
import { Transition, animated } from 'react-spring/renderprops.cjs';
import useMedia from 'use-media';
import classNames from 'classnames';

import ModalHeader from '../atoms/ModalHeader';
import ModalBody from '../atoms/ModalBody';
import ModalFooter from '../atoms/ModalFooter';
import Backdrop from '../atoms/Backdrop';

/* eslint-disable react/display-name */

const Modal = ({
    backgroundImage,
    className = '',
    disableBackdrop = false,
    isOpen = false,
    type = '',
    children,
    /** Defaults to onClose */
    canCloseWithBackdropClick = true,
    onClickBackdrop,
    animate = true,
    closeWithEscapeKey = true,
    /** Method called when user wants to close the Modal */
    onClose = () => {},
    /** Method called when modal is fully opened and animation is complete */
    onOpened = () => {},
    /** Method called when modal is fully closed and animation is complete */
    onClosed = () => {},
    size,
    ...htmlAtrributes
}) => {
    const modalRef = React.useRef();
    const [isRested, setIsRested] = React.useState(false);
    // Focus on modal once animation is finished so user can hit escape
    React.useLayoutEffect(() => {
        if (isOpen && !!modalRef.current) {
            const isModalFocused = document.activeElement === modalRef.current || modalRef.current.contains(document.activeElement);
            if (!isModalFocused) {
                modalRef.current.focus();
            }
        }
    }, [isOpen, isRested]);
    const isMobile = useMedia({ maxWidth: 768 });

    const sheet = {
        open: { bottom: '0%' },
        closed: { bottom: '-100%' }
    };

    const transitionProps = {
        from: type === 'sheet' && isMobile ? sheet.closed : { opacity: 1, transform: 'scale(0.3)' },
        enter: type === 'sheet' && isMobile ? sheet.open : { opacity: 1, transform: 'scale(1.0)' },
        leave: type === 'sheet' && isMobile ? sheet.closed : { opacity: 0, transform: 'scale(0.3)' }
    };

    const modalClassNames = classNames('vdp-react-modal', {
        [`--${type}`]: type,
        [`--${size}`]: size,
        [className]: className
    });
    const isIe11 = !!window.MSInputMethodContext && !!document.documentMode;
    const shouldAnimate = !isIe11 && animate;
    const backgroundStyle = !!backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : null;
    const handleKeyDown = e => {
        const { key, keyCode, which } = e;
        if (closeWithEscapeKey && (key === 'Escape' || which === 27 || keyCode === 27)) {
            onClose();
            e.preventDefault();
        }
    };

    const handleBackdropClick = () => {
        if (canCloseWithBackdropClick && typeof onClickBackdrop === 'undefined') {
            onClose();
        } else if (!!onClickBackdrop) {
            onClickBackdrop();
        }
    };

    const onStart = () => {
        setIsRested(false);
    };

    const onRest = () => {
        setIsRested(true);
        if (isOpen) {
            onOpened();
        } else {
            onClosed();
        }
    };

    return (
        <>
            <Transition native items={isOpen} onStart={onStart} onRest={onRest} immediate={!shouldAnimate} {...transitionProps}>
                {show =>
                    show &&
                    (animationProps => {
                        return (
                            <animated.aside onClick={handleBackdropClick} className={modalClassNames} {...htmlAtrributes}>
                                <animated.div
                                    tabIndex="-1"
                                    ref={modalRef}
                                    onKeyDown={handleKeyDown}
                                    style={{ ...animationProps, ...backgroundStyle }}
                                    onClick={e => e.stopPropagation()}
                                    className={`vdp-react-modal__container ${isOpen ? '--open' : ''}`}>
                                    {children}
                                </animated.div>
                            </animated.aside>
                        );
                    })
                }
            </Transition>
            {!disableBackdrop && <Backdrop isOpen={isOpen} />}
        </>
    );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Backdrop = Backdrop;

Modal.TYPES = {
    SHEET: 'sheet',
    FULL_SCREEN: 'full-screen'
};

Modal.SIZES = {
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg'
};

Modal.propTypes = {
    onOpened: PropTypes.func,
    onClosed: PropTypes.func,
    backgroundImage: PropTypes.string,
    animate: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    isOpen: PropTypes.bool.isRequired,
    disableBackdrop: PropTypes.bool,
    type: PropTypes.oneOf([Modal.TYPES.SHEET, Modal.TYPES.FULL_SCREEN]),
    onClickBackdrop: PropTypes.func,
    onClose: PropTypes.func,
    canCloseWithBackdropClick: PropTypes.bool,
    closeWithEscapeKey: PropTypes.bool,
    size: PropTypes.oneOf([Modal.SIZES.SMALL, Modal.SIZES.MEDIUM, Modal.SIZES.LARGE])
};

export default Modal;
