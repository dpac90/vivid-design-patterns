import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ModalHeader from '../atoms/ModalHeader';
import ModalBody from '../atoms/ModalBody';
import ModalFooter from '../atoms/ModalFooter';

class Modal extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        onClose: PropTypes.func,
        opened: PropTypes.bool,
        title: PropTypes.string,
        type: PropTypes.oneOf(['default', 'sheet']),
        Backdrop: PropTypes.node
    };

    static Header = ModalHeader;
    static Body = ModalBody;
    static Footer = ModalFooter;

    constructor(props) {
        super(props);

        const { className, opened = true } = props;
        const hasOpenedClassName = !!className && className.includes('--opened');
        const hasClosedClassName = !!className && className.includes('--closed');

        this.state = {
            isOpened: !hasClosedClassName && (hasOpenedClassName || !!opened)
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { props, state } = this;

        if (props.opened !== state.isOpened && prevState.isOpened === state.isOpened) {
            this.setState({ isOpened: !!props.opened });
        }
    }

    toggleModal = () => {
        this.setState(prevState => ({
            isOpened: !prevState.isOpened
        }));

        const { onClose = () => {} } = this.props;
        onClose();
    };

    render() {
        const { props, state, toggleModal } = this;
        const { children, className = '', title = '', type = 'default', Backdrop } = props;
        const { isOpened } = state;
        const modalClassNames = classNames('vp-modal', {
            [`--${type}`]: type === 'sheet',
            [`--opened`]: !className.includes('--opened') && !!isOpened,
            [`--closed`]: !className.includes('--closed') && !isOpened
        });

        return (
            <React.Fragment>
                <aside className={`${className} ${modalClassNames}`}>
                    <div className="vp-modal__container">
                        {!!title.length && <Modal.Header>{title}</Modal.Header>}
                        <Modal.Body>{children}</Modal.Body>
                        <Modal.Footer />
                    </div>
                    {!!Backdrop && Backdrop}
                </aside>
            </React.Fragment>
        );
    }
}

export default Modal;
