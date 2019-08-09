import React from 'react';
import PropTypes from 'prop-types';

const Toast = ({ isOpen, children, transitionOpacity = false }) => {
    return <div className={`toast-notification${transitionOpacity ? '--opacity' : ''} ${isOpen ? 'open' : ''}`}>{children}</div>;
};

Toast.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool.isRequired,
    transitionOpacity: PropTypes.bool
};

export default Toast;
