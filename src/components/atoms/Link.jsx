import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Link = ({ children, className, href, size }) => {
    Link.propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        href: PropTypes.string.isRequired,
        size: PropTypes.oneOf(['body-1', 'body-2', 'small', 'tiny'])
    };

    const aTagClassNames = classNames('vp-type-link', {
        [`--${size}`]: size
    });

    return <a {...{ href, className: aTagClassNames }}>{children}</a>;
};

export default Link;
