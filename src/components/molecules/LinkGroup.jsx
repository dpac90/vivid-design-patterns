import React from 'react';
import PropTypes from 'prop-types';

const LinkGroup = ({ children, importance, className, ...htmlAttributes }) => {
    const baseLinkGroupClass = `vp-link-group${importance ? `--${importance}` : ''}`;
    const props = {
        className: className ? `${baseLinkGroupClass} ${className}` : baseLinkGroupClass,
        ...htmlAttributes
    };
    return (
        <ul {...{ ...props, ...htmlAttributes }}>
            {React.Children.map(children, child => (
                <li className="vp-link-group__item">{child}</li>
            ))}
        </ul>
    );
};

LinkGroup.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    importance: PropTypes.oneOf(['striped', 'muted'])
};

export default LinkGroup;
