import React from 'react';
import PropTypes from 'prop-types';

const CardHeader = ({ className = '', children, ...htmlAttributes }) => {
    return (
        <div className={`vp-card__header ${className}`} {...htmlAttributes}>
            {children}
        </div>
    );
};

CardHeader.propTypes = {
    className: PropTypes.string
};

export default CardHeader;
