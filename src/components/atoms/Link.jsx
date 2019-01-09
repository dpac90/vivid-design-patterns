import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import onEnterKey from '../../utils/onEnterEventListener';

const Link = ({ children, className, href, onClick, ...attributes }) => {
    Link.propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        href: PropTypes.string.isRequired,
        onClick: PropTypes.func
    };

    const props = {
        href,
        onClick,
        onKeyPress: onEnterKey.bind(null, onClick),
        className: classNames('vp-type-link', {
            [className]: !!className
        }),
        ...attributes
    };

    return <a {...props}>{children}</a>;
};

export default Link;
