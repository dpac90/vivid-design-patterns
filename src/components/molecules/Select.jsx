import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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

    static Option({ children, ...attributes }) {
        return <option {...attributes}>{children}</option>;
    }

    isControlled(propName) {
        return this.props[propName] !== undefined;
    }

    getValueFromState() {
        return this.isControlled('value') ? this.props.value : this.state.value;
    }

    onBlur = e => {
        this.props.onBlur(e);

        const error = this.props.validationMethod(e.target.value);

        this.setState({ error });
    };

    onChange = e => {
        e.target.blur();
        e.preventDefault();
        const value = e.target.value;
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

    render() {
        const { props, onChange, onBlur, state } = this;
        // validationMethod, onBlur, and onChange shouldn't be added to the DOM attributes, ignore
        const {
            id,
            outlined,
            className,
            small,
            medium,
            disabled,
            label,
            validationMethod,
            onBlur: ignoredBlur,
            onChange: ignoredChange,
            ...attributes
        } = props;
        const { error, filled } = state;
        const value = this.getValueFromState();
        const selectProps = {
            id,
            onChange,
            onBlur,
            value,
            disabled: disabled ? 'disabled' : null,
            className: classnames('vp-select__control', {
                '--small': small,
                '--medium': medium
            })
        };

        const containerProps = {
            className: classnames('vp-select', {
                '--outlined': outlined,
                [className]: !!className
            }),
            'data-state': classnames({
                filled,
                error
            }),
            ...attributes
        };

        const emptyOption = !value && !!label ? <Select.Option disabled="disabled" selected="selected" /> : null;

        return (
            <div {...containerProps}>
                <select {...selectProps} aria-label="select">
                    {emptyOption}
                    {props.children}
                </select>
                {!!label && (
                    <label className="vp-floating-label" htmlFor={id}>
                        {label}
                    </label>
                )}
                {!!error && <span className="vp-helper-text--validation">{error}</span>}
            </div>
        );
    }
}

export default Select;
