import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Tab = ({ children, className, href, active, onClick = () => {}, ...attributes }) => {
    Tab.propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        href: PropTypes.string,
        active: PropTypes.bool,
        onClick: PropTypes.func
    };

    const props = {
        href,
        onClick,
        className: classNames('vp-tab', {
            [className]: !!className
        }),
        'data-state': !!active ? 'active' : '',
        ...attributes
    };

    return <a {...props}>{children}</a>;
};

export default Tab;
