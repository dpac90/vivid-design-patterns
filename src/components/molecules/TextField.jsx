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
        type: 'text'
    };

    static propTypes = {
        /** If the noValidate prop is present, the field will not turn green or red to indicate its validation status. Do not pass this in if you are passing in a validationMethod Prop */
        noValidate: PropTypes.bool,
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
        value: PropTypes.string,
        /** Validation method that should return a string for the error to displayed. Do not pass in validationMethod if you pass in noValidate prop */
        validationMethod: PropTypes.func,
        trailingIcon: PropTypes.node,
        helperText: PropTypes.string
    };

    state = {
        active: !!this.props.defaultValue,
        value: this.props.defaultValue,
        error: '',
        dirty: false,
        showControlledError: !!this.props.error
    };

    componentDidUpdate(prevProps) {
        const { value } = this.props;
        const { dirty } = this.state;
        const isDirty = !!value;

        if (!dirty && prevProps.value !== value) {
            this.setState({
                dirty: isDirty
            });
        }
    }

    onChange = e => {
        const { value } = e.target;
        const { dirty } = this.state;
        const error = dirty ? this.props.validationMethod(value) : '';
        this.setState({
            value,
            error,
            active: !!value,
            showControlledError: false
        });
        this.props.onChange(e);
    };

    onFocus = e => {
        this.setState({ active: true });
        this.props.onFocus(e);
    };

    onBlur = e => {
        const { value } = e.target;
        const error = this.props.validationMethod(value);
        this.setState({ active: !!value, dirty: true, error });
        this.props.onBlur(e);
    };

    // Called By Ref in Parent Form
    setShowControlledErrorState() {
        this.setState({
            showControlledError: true
        });
    }

    render() {
        const {
            id,
            defaultValue,
            label,
            outlined,
            helperText,
            trailingIcon,
            noValidate,
            validationMethod,
            onFocus,
            onBlur,
            onChange,
            type,
            className,
            value,
            error: controlledError,
            ...htmlAttributes
        } = this.props;
        const { active, dirty, error, showControlledError } = this.state;
        const inputContainerClassName = classNames('vdp-textfield', {
            [`${className}`]: className,
            '--outlined': outlined
        });

        const shouldShowControlledError = showControlledError && controlledError;
        const errorState = !!error || shouldShowControlledError;
        const dataState = classNames({
            error: errorState,
            filled: active || !!value,
            success: !errorState && dirty && !noValidate
        });

        const inputProps = {
            id,
            onChange: this.onChange,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            defaultValue,
            value,
            ...htmlAttributes
        };

        return (
            <div className={inputContainerClassName} data-state={dataState} data-validate={dirty || Boolean(error)}>
                {type === 'password' ? (
                    <PasswordInput {...inputProps} />
                ) : (
                    <React.Fragment>
                        {Boolean(trailingIcon) && <span className="vdp-textfield__trailing-icon">{trailingIcon}</span>}
                        <Input {...inputProps} />
                    </React.Fragment>
                )}
                <label className="vdp-floating-label" htmlFor={id}>
                    {label}
                </label>
                {!!error && <span className="vdp-helper-text--validation">{error}</span>}
                {!!shouldShowControlledError && <span className="vdp-helper-text--validation">{controlledError}</span>}
                {!!helperText && <span className="vdp-helper-text">{error}</span>}
            </div>
        );
    }
}

export default TextField;
