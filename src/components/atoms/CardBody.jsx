import React from 'react';
import PropTypes from 'prop-types';

const CardBody = ({ className = '', children, ...htmlAttributes }) => (
    <div className={`vp-card__body ${className}`} {...htmlAttributes}>
        {children}
    </div>
);

CardBody.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default CardBody;
