import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Input extends React.Component {
    static defaultProps = {
        onChange: () => {},
        onBlur: () => {},
        onFocus: () => {},
        validationMethod: () => {}
    };

    static propTypes = {
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        name: PropTypes.string,
        defaultValue: PropTypes.string,
        error: PropTypes.string,
        validationMethod: PropTypes.func
    };

    state = {
        filled: !!this.props.defaultValue,
        value: this.props.defaultValue || '',
        error: ''
    };

    onChange = e => {
        const value = e.target.value;
        let error = '';
        if (this.state.dirty) {
            error = this.props.validationMethod(value);
        }
        this.setState(
            {
                value,
                error,
                filled: !!value
            },
            () => {
                this.props.onChange(value);
            }
        );
    };

    onFocus = () => {
        this.setState({ filled: true }, this.props.onFocus);
    };

    onBlur = e => {
        const value = e.target.value;
        const error = this.props.validationMethod(value);
        this.setState({ filled: !!value, dirty: true, error }, this.props.onBlur);
    };

    render() {
        const { className, defaultValue, label, outlined, validationMethod, onFocus, onBlur, onChange, ...htmlAttributes } = this.props;
        const { filled, dirty } = this.state;
        const error = this.state.error || this.props.error;
        const inputClassName = classNames('vp-textfield__input', {
            className
        });

        const inputContainerClassName = classNames('vp-textfield', {
            ['--outlined']: outlined
        });

        const dataState = classNames({
            error,
            filled,
            success: !error && dirty
        });

        return (
            <div className={inputContainerClassName} data-state={dataState}>
                <input
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    className={inputClassName}
                    defaultValue={defaultValue}
                    {...htmlAttributes}
                />
                <label className="vp-floating-label">{label}</label>
                {!!error && <span className="vp-helper-text--validation">{error}</span>}
            </div>
        );
    }
}

export default Input;
