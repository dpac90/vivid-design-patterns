import React from 'react';
import PropTypes from 'prop-types';

const ModalFooter = ({ className = '', children, htmlAttributes }) => (
    <div className={`vp-modal__footer ${className}`} {...htmlAttributes}>
        {children}
    </div>
);

ModalFooter.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

export default ModalFooter;
