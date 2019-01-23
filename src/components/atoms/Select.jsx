import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Select extends React.Component {
    state = {
        value: ''
    };

    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func,
        outlined: PropTypes.bool,
        small: PropTypes.bool,
        medium: PropTypes.bool,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        value: undefined,
        onChange: () => {},
        outlined: false,
        small: false,
        medium: false,
        disabled: false
    };

    static Option({ value, children }) {
        return <option value={value}>{children}</option>;
    }

    isControlled(propName) {
        return this.props[propName] !== undefined;
    }

    getValueFromState() {
        return this.isControlled('value') ? this.props.value : this.state.value;
    }

    onChange = e => {
        e.target.blur();
        e.preventDefault();
        const value = e.target.value;

        if (this.isControlled('value')) {
            this.props.onChange(value);
        } else {
            this.setState(
                {
                    value
                },
                () => {
                    this.props.onChange(this.state.value);
                }
            );
        }
    };

    render() {
        const { props, onChange } = this;
        const { outlined, className, small, medium, disabled } = props;
        const selectProps = {
            onChange,
            disabled: disabled ? 'disabled' : null,
            value: this.getValueFromState(),
            className: classnames('vp-select__control', {
                [className]: !!className,
                '--small': small,
                '--medium': medium
            })
        };

        const containerClassnames = classnames('vp-select', {
            '--outlined': outlined
        });

        return (
            <div className={containerClassnames}>
                <select {...props} {...selectProps} aria-label="select">
                    {props.children}
                </select>
            </div>
        );
    }
}

export default Select;
