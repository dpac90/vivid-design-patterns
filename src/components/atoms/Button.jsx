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
    href,
    type = 'submit',
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
        [`--disabled`]: disabled,
        [`--selected`]: selected,
        [`--raised`]: raised
    });

    const props = {
        className: className ? `${buttonClassNames} ${className}` : buttonClassNames,
        onMouseEnter,
        onMouseLeave,
        onClick,
        onFocus,
        onBlur,
        ...htmlAttributes
    };

    return href ? <a {...{ ...props, href }}> {children}</a> : <button {...{ ...props, type, disabled }}>{children}</button>;
};

Button.propTypes = {
    /** html button types eg submit, reset, button` */
    type: PropTypes.string,
    children: PropTypes.node,
    /** renders to html class `--small`, `--large` */
    size: PropTypes.oneOf(['small', 'large']),
    /** renders to html class `--raised` */
    raised: PropTypes.bool,
    /** renders to html class `--select` */
    selected: PropTypes.bool,
    /** Components will render as anchor tags when href is provided */
    href: PropTypes.string,
    /** renders to html class `--disabled` */
    disabled: PropTypes.bool,
    className: PropTypes.string,
    /** has html class of `vp-grouped-button` */
    grouped: PropTypes.bool,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseEnter: PropTypes.func,
    /** renders to html `--secondary`, `--tertiary` */
    importance: PropTypes.oneOf(['secondary', 'tertiary'])
};

export default Button;
