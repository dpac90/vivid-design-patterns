import React from 'react';
import PropTypes from 'prop-types';

const Backdrop = ({ className = '', children, onClick = () => {} }) => (
    <div
        {...{
            onClick,
            className: `${className} vp-backdrop`
        }}>
        {children}
    </div>
);

Backdrop.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
};

export default Backdrop;
