import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Tab = ({
    children,
    className,
    href,
    active,
    onClick = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    ...attributes
}) => {
    Tab.propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        href: PropTypes.string,
        active: PropTypes.bool,
        onClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func
    };

    const props = {
        href,
        onClick,
        onMouseEnter,
        onMouseLeave,
        className: classNames('vp-tab', {
            [className]: !!className
        }),
        'data-state': active ? 'active' : null,
        ...attributes
    };

    return (
        <li>
            <a {...props}>{children}</a>
        </li>
    );
};

export default Tab;
