import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({
    children,
    size,
    raised,
    selected,
    importance,
    className,
    type,
    grouped,
    disabled,
    onClick = () => {},
    onFocus = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    onBlur = () => {},
    ...htmlAttributes
}) => {
    const baseButtonClass = grouped ? 'vp-grouped-button' : 'vp-button';
    const buttonClassNames = classNames(baseButtonClass, {
        [`--${size}`]: size,
        [`--${importance}`]: importance,
        [`--selected`]: selected,
        [`--raised`]: raised
    });

    return (
        <button
            type={type}
            className={className || buttonClassNames}
            disabled={disabled}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            {...htmlAttributes}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    size: PropTypes.oneOf(['small', 'large']),
    raised: PropTypes.bool,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    grouped: PropTypes.bool,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseLeave: PropTypes.func,
    importance: PropTypes.oneOf(['secondary', 'tertiary'])
};

export default Button;
