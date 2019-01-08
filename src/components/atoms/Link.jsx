import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Link = ({ children, className, href }) => {
    Link.propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        href: PropTypes.string.isRequired
    };

    const aTagClassNames = classNames('vp-type-link', {
        [className]: !!className
    });

    return <a {...{ href, className: aTagClassNames }}>{children}</a>;
};

export default Link;
