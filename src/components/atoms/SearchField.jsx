import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SearchField = ({
    children,
    className,
    disabled,
    onClick = () => {},
    onFocus = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    onBlur = () => {},
    ...htmlAttributes
}) => {
    const baseSearchFieldClass = 'vp-search';
    const searchFieldClassNames = classNames(baseSearchFieldClass, {
        [`--disabled`]: disabled
    });

    const props = {
        className: className ? `${searchFieldClassNames} ${className}` : searchFieldClassNames,
        onMouseEnter,
        onMouseLeave,
        onClick,
        onFocus,
        onBlur,
        ...htmlAttributes
    };

    return (
        <div className="vp-search-field">
            <i className="vp-search-field__icon-search material-icons">&#xE8B6;</i>
            <input
                type="text"
                id="searchTerm"
                name="searchTerm"
                className="vp-search-field__input"
                placeholder="Search by team, artist, event or venue"
                autoComplete="off"
            />
            <i id="searchFieldClear" className="vp-search-field__icon-close material-icons">
                &#xE5C9;
            </i>
        </div>
    );
};

SearchField.propTypes = {
    children: PropTypes.node,
    /** renders to html class `--disabled` */
    disabled: PropTypes.bool,
    className: PropTypes.string,
    grouped: PropTypes.bool,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseEnter: PropTypes.func
};

export default SearchField;
