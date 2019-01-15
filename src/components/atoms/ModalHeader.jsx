import React from 'react';
import PropTypes from 'prop-types';

const ModalHeader = ({ className = '', children, ...htmlAttributes }) => (
    <h6 className={`vp-modal__header ${className} ${!className.includes('vp-type') ? 'vp-type-headline6' : ''}`} {...htmlAttributes}>
        {children}
    </h6>
);

ModalHeader.displayName = 'ModalHeader';

ModalHeader.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

export default ModalHeader;
