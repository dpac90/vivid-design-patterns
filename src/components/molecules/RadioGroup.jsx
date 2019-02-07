import React from 'react';
import PropTypes from 'prop-types';

class RadioGroup extends React.Component {
    state = {
        value: this.props.value || '',
        error: this.props.error || ''
    };

    onChange = e => {
        const { value } = e.target;
        const error = this.props.validationMethod(value);
        if (this.isControlled('value')) {
            this.props.onChange(value);
        } else {
            this.setState(
                {
                    value,
                    error
                },
                () => {
                    this.props.onChange(this.state.value);
                }
            );
        }
    };

    isControlled(propName) {
        return this.props[propName] !== undefined;
    }

    render() {
        const { children, className, onChange, validationMethod, ...htmlAttributes } = this.props;
        const { value, error } = this.state;
        const { props } = this;
        const classNames = className ? `vp-control-group ${className}` : 'vp-control-group';
        return (
            <div className={classNames} {...htmlAttributes} data-state={error ? 'error' : null}>
                {React.Children.map(children, child =>
                    React.cloneElement(child, {
                        isChecked: value === child.props.value,
                        name: props.name,
                        onChange: event => this.onChange(event)
                    })
                )}
                {!!error && <span className="vp-helper-text--validation">{error}</span>}
            </div>
        );
    }
}

RadioGroup.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    validationMethod: PropTypes.func
};

RadioGroup.defaultProps = {
    className: '',
    onChange: () => {},
    validationMethod: () => {}
};

export default RadioGroup;
