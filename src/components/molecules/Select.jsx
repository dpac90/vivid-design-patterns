import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SelectDropdown from '../atoms/SelectDropdown';
import Label from '../atoms/Label';
import ErrorMessage from '../atoms/ErrorMessage';

class Select extends React.Component {
    state = {
        value: this.props.value || '',
        error: this.props.error || '',
        filled: !!this.props.value
    };

    static propTypes = {
        value: PropTypes.string,
        error: PropTypes.string,
        label: PropTypes.string,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        validationMethod: PropTypes.func,
        outlined: PropTypes.bool,
        small: PropTypes.bool,
        medium: PropTypes.bool,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        label: '',
        onChange: () => {},
        onBlur: () => {},
        validationMethod: () => {},
        outlined: false,
        small: false,
        medium: false,
        disabled: false
    };

    onBlur = e => {
        const error = this.props.validationMethod(e.target.value);
        this.props.onBlur(e);
        this.setState({ error });
    };

    onChange = e => {
        e.target.blur();
        e.preventDefault();
        const { value } = e.target;
        const error = this.props.validationMethod(value);

        if (this.isControlled('value')) {
            this.props.onChange(value);
        } else {
            this.setState(
                {
                    value,
                    error,
                    filled: !!value
                },
                () => {
                    this.props.onChange(this.state.value);
                }
            );
        }

        this.props.onBlur(e);
    };

    isControlled(propName) {
        return this.props[propName] !== undefined;
    }

    render() {
        const {
            id,
            outlined,
            className,
            small,
            medium,
            disabled,
            label,
            validationMethod, // not used, kept from dom attributes
            onChange, // not used, kept from dom attributes
            children,
            ...attributes
        } = this.props;
        const { error, filled } = this.state;
        const selectProps = {
            id,
            label,
            disabled,
            small,
            medium,
            value: this.isControlled('value') ? this.props.value : this.state.value,
            onChange: this.onChange,
            onBlur: this.onBlur
        };

        const containerProps = {
            className: classnames('vp-select', {
                '--outlined': outlined,
                [className]: !!className
            }),
            'data-state': classnames({ filled, error }),
            ...attributes
        };

        return (
            <div {...containerProps}>
                <SelectDropdown {...selectProps}>{children}</SelectDropdown>
                <Label label={label} id={id} />
                <ErrorMessage error={error} />
            </div>
        );
    }
}

export default Select;
