import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import SelectOption from './SelectOption';

function getEmptyOption(value, label) {
    if (!!value || !label) return null;

    return <SelectOption disabled="disabled" />;
}

function NativeSelect({ onChange, onBlur, id, value, label, disabled, small, medium, children }) {
    const emptyOption = getEmptyOption(value, label);
    const selectAttributes = {
        id,
        value,
        onChange,
        onBlur,
        disabled,
        className: classnames('vp-select__control', {
            '--small': small,
            '--medium': medium
        })
    };

    return (
        <select {...selectAttributes} aria-label="select">
            {emptyOption}
            {children}
        </select>
    );
}

NativeSelect.propTypes = {
    children: PropTypes.element.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    id: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    medium: PropTypes.bool
};

export default NativeSelect;
