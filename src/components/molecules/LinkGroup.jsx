import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const LinkGroup = ({ children, importance = 'default', className, onClick = () => {}, ...htmlAttributes }) => {
    const baseLinkGroupClass = 'vp-link-group';
    const linkGroupClassNames = classNames(baseLinkGroupClass, {
        [`--${importance}`]: importance
    });

    const props = {
        className: className ? `${linkGroupClassNames} ${className}` : linkGroupClassNames,
        onClick,
        ...htmlAttributes
    };
    return <div {...props}>{children.map(child => React.cloneElement(child, { className: 'vp-link-group__item' }))}</div>;
};

LinkGroup.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    importance: PropTypes.oneOf(['default', 'striped', 'footer'])
};

export default LinkGroup;
