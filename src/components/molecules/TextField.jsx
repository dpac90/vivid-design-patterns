import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../atoms/Input';
import PasswordInput from './PasswordInput';
// The 'value' in state is used by Form.jsx
/* eslint react/no-unused-state: 0 */

class TextField extends React.Component {
    static defaultProps = {
        onChange: () => {},
        onBlur: () => {},
        onFocus: () => {},
        validationMethod: () => {},
        defaultValue: '',
        type: 'text'
    };

    static propTypes = {
        type: PropTypes.string,
        className: PropTypes.string,
        outlined: PropTypes.bool,
        children: PropTypes.node,
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        name: PropTypes.string,
        defaultValue: PropTypes.string,
        error: PropTypes.string,
        validationMethod: PropTypes.func,
        trailingIcon: PropTypes.node,
        helperText: PropTypes.string
    };

    state = {
        active: !!this.props.defaultValue,
        value: this.props.defaultValue,
        error: this.props.error,
        dirty: false
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            this.setState({
                error
            });
        }
    }

    onChange = e => {
        const { value } = e.target;
        const { dirty } = this.state;
        const error = dirty ? this.props.validationMethod(value) : '';
        this.setState(
            {
                value,
                error,
                active: !!value
            },
            () => {
                this.props.onChange(value);
            }
        );
    };

    onFocus = e => {
        this.setState({ active: true }, () => this.props.onFocus(e.target.value));
    };

    onBlur = e => {
        const { value } = e.target;
        const error = this.props.validationMethod(value);
        this.setState({ active: !!value, dirty: true, error }, () => this.props.onBlur(value));
    };

    render() {
        const {
            id,
            defaultValue,
            label,
            outlined,
            helperText,
            trailingIcon,
            validationMethod,
            onFocus,
            onBlur,
            onChange,
            type,
            className,
            ...htmlAttributes
        } = this.props;
        const { active, dirty, error } = this.state;
        const inputContainerClassName = classNames('vp-textfield', {
            [`${className}`]: className,
            '--outlined': outlined
        });

        const dataState = classNames({
            error,
            filled: active,
            success: !error && dirty
        });

        const inputProps = {
            id,
            onChange: this.onChange,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            defaultValue,
            ...htmlAttributes
        };

        return (
            <div className={inputContainerClassName} data-state={dataState} data-validate={dirty || Boolean(error)}>
                {type === 'password' ? (
                    <PasswordInput {...inputProps} />
                ) : (
                    <React.Fragment>
                        {Boolean(trailingIcon) && <span className="vp-textfield__trailing-icon">{trailingIcon}</span>}
                        <Input {...inputProps} />
                    </React.Fragment>
                )}
                <label className="vp-floating-label" htmlFor={id}>
                    {label}
                </label>
                {!!error && <span className="vp-helper-text--validation">{error}</span>}
                {!!helperText && <span className="vp-helper-text">{error}</span>}
            </div>
        );
    }
}

export default TextField;
