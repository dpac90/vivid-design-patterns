import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ModalHeader from '../atoms/ModalHeader';
import ModalBody from '../atoms/ModalBody';
import ModalFooter from '../atoms/ModalFooter';
import Backdrop from '../atoms/Backdrop';

class Modal extends React.Component {
    static Header = ModalHeader;
    static Body = ModalBody;
    static Footer = ModalFooter;

    static DATA_STATE = {
        OPENED: 'opened',
        OPENING: 'opening',
        CLOSED: 'closed',
        CLOSING: 'closing'
    };
    static TYPES = ['sheet'];

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        dataState: PropTypes.oneOf([Modal.DATA_STATE.OPENED, Modal.DATA_STATE.CLOSED]),
        disableBackdrop: PropTypes.bool,
        htmlAttributes: PropTypes.object,
        onClose: PropTypes.func,
        onOpen: PropTypes.func,
        title: PropTypes.string,
        type: PropTypes.oneOf(Modal.TYPES)
    };

    constructor(props) {
        super(props);

        this.state = {
            dataState: this.props.dataState || Modal.DATA_STATE.CLOSED
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { props, state } = this;

        if (
            state.dataState !== prevState.dataState &&
            state.dataState === Modal.DATA_STATE.OPENING &&
            props.dataState === prevProps.dataState
        ) {
            // handle dataState open from toggleModal
            setTimeout(() => {
                this.setState({ dataState: Modal.DATA_STATE.OPENED });
            }, 500);
        } else if (
            state.dataState !== prevState.dataState &&
            state.dataState === Modal.DATA_STATE.CLOSING &&
            props.dataState === prevProps.dataState
        ) {
            // handle dataState close from toggleModal
            setTimeout(() => {
                this.setState({ dataState: Modal.DATA_STATE.CLOSED });
            }, 500);
        } else if (props.dataState !== state.dataState && prevState.dataState === state.dataState) {
            // handle new dataState prop from parent
            this.setState({ dataState: props.dataState });
        }
    }

    toggleModal = () => {
        const { dataState } = this.state;

        if (dataState === Modal.DATA_STATE.CLOSED) {
            this.setState({ dataState: Modal.DATA_STATE.OPENING }); // opening and closing dataStates used in _modals.scss

            const { onOpen = () => {} } = this.props;
            onOpen();
        } else if (dataState === Modal.DATA_STATE.OPENED) {
            this.setState({ dataState: Modal.DATA_STATE.CLOSING });

            const { onClose = () => {} } = this.props;
            onClose();
        }
    };

    getChild = (children, childName) => {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            if (!!child.type && child.type.displayName === childName) {
                return child;
            }
        }

        return null;
    };

    render() {
        const { props, state, toggleModal, getChild } = this;
        const { className = '', disableBackdrop = false, title = '', type = 'default' } = props;
        let { children = [] } = props;
        const { dataState = '' } = state;

        const modalClassNames = classNames('vp-modal', {
            [`--${type}`]: Modal.TYPES.includes(type)
        });

        const ModalHeader = getChild(children, 'ModalHeader');
        const ModalBody = getChild(children, 'ModalBody');
        const ModalFooter = getChild(children, 'ModalFooter');

        children = Array.isArray(children) ? children : [children];
        const bodyChildren = children.filter(child => {
            if (!child.type) {
                return true;
            }

            const { displayName } = child.type;
            return !displayName || !['ModalHeader', 'ModalBody', 'ModalFooter'].includes(displayName);
        });

        return (
            <React.Fragment>
                <aside className={`${modalClassNames} ${className}`} data-state={!!dataState.length ? dataState : Modal.DATA_STATE.CLOSED}>
                    <div className="vp-modal__container">
                        {!!ModalHeader ? ModalHeader : <Modal.Header>{title}</Modal.Header>}
                        {!!ModalBody ? ModalBody : <Modal.Body>{bodyChildren}</Modal.Body>}
                        {!!ModalFooter ? ModalFooter : <Modal.Footer onDismiss={toggleModal} />}
                    </div>
                </aside>
                {!disableBackdrop && <Backdrop dataState={dataState} onClick={toggleModal} />}
            </React.Fragment>
        );
    }
}

export default Modal;
