import React from 'react';
import SelectOption from './SelectOption';
import classnames from 'classnames';

class SelectDropdown extends React.Component {
    getEmptyOption(value, label) {
        if (!!value || !label) return null;

        return <SelectOption disabled="disabled" />;
    }

    render() {
        const { onChange, onBlur, id, value, label, disabled, small, medium, children } = this.props;
        const emptyOption = this.getEmptyOption(value, label);
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
}

export default SelectDropdown;
