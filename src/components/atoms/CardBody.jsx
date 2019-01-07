import React from 'react';

const Body = ({ className = '', children, ...htmlAttributes }) => {
    return (
        <div className={`vp-card__body ${className}`} {...htmlAttributes}>
            {children}
        </div>
    );
};

export default Body;
